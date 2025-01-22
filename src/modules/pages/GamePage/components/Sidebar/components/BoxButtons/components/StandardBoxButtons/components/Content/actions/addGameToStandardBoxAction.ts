"use server";

import { CustomError } from "@/modules/shared/utils/errorHandler";
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
      throw new CustomError("Jogo já adicionado dentro da caixa.");
    }

    // Obtém informações sobre o usuário, se não encontrar, retorna
    const user = await findUserById({
      userId: userId,
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado.");
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
      throw new CustomError("Limite máximo de jogos dentro de caixa.");
    }

    // Adiciona o jogo na caixa
    await addGameToStandardBox({
      userId: userId,
      gameId: gameId,
      boxName: box,
    });

    revalidatePath(`/jogos/${gameId}`);
  } catch (error) {
    if (error instanceof CustomError) {
      return {
        messages: {
          error: error.message,
        },
      };
    }

    return {
      messages: {
        error: "Ocorreu um erro inesperado, por favor, tente novamente.",
      },
    };
  }
}
