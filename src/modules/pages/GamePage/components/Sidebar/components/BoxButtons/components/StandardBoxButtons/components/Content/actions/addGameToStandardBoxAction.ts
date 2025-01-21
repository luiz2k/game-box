"use server";

import {
  addGameToStandardBox,
  findAllStandardBoxByUserId,
} from "@/modules/shared/lib/prisma/standardBox";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { getPlanInfos } from "@/modules/shared/utils/plains";
import { Box } from "@prisma/client";
import { revalidatePath } from "next/cache";

type AddGameToStandardBoxAction = {
  userId: number;
  gameId: number;
  box: Box;
};

// Adiciona um jogo em uma caixa padrão
export async function addGameToStandardBoxAction({
  userId,
  gameId,
  box,
}: AddGameToStandardBoxAction) {
  try {
    // Verifica se o jogo já foi adicionado na caixa, se sim, retorna
    const standardBox = await findAllStandardBoxByUserId({
      userId,
      gameId,
      boxName: box,
    });

    if (standardBox.length > 0) {
      throw "Jogo já adicionado dentro da caixa.";
    }

    // Obtém informações sobre o usuário, se não encontrar, retorna
    const user = await findUserById({
      userId: userId,
    });

    if (!user) {
      throw "Usuário não encontrado.";
    }

    // Obtém todos os jogos dentro da caixa
    const gamesInTheBox = await findAllStandardBoxByUserId({
      userId,
      boxName: box,
    });

    // Obtém informações sobre o plano do usuário
    const userPlan = getPlanInfos(user.plan);
    const boxLimit = userPlan?.gameLimit ?? 0;

    // Veirifica se o usuário atingiu o limite máximo de jogos dentro da caixa, se sim, retorna
    const limitExceeded = gamesInTheBox.length >= boxLimit;

    if (limitExceeded) {
      throw "Limite máximo de jogos dentro de caixa.";
    }

    // Adiciona o jogo na caixa
    await addGameToStandardBox({
      userId: userId,
      gameId: gameId,
      boxName: box,
    });

    revalidatePath(`/jogos/${gameId}`);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        menssages: {
          error: "Ocorreu um erro inesperado, tente novamente.",
        },
      };
    }

    return {
      menssages: {
        error: String(error),
      },
    };
  }
}
