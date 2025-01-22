"use server";

import { CustomError } from "@/modules/shared/utils/errorHandler";
import {
  addListedGame,
  findAllListedGameByUserId,
} from "@/modules/shared/lib/prisma/listedGame";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { getPlanInfos } from "@/modules/shared/utils/plains";
import { revalidatePath } from "next/cache";

type AddGameToCustomBoxAction = {
  userId: number;
  gameId: number;
  customBoxId: number;
};

export async function addGameToCustomBoxAction({
  userId,
  gameId,
  customBoxId,
}: AddGameToCustomBoxAction) {
  try {
    // Verifica se o jogo já foi adicionado na caixa, se sim, lança um error
    const game = await findAllListedGameByUserId({
      userId: userId,
      gameId: gameId,
      boxId: customBoxId,
    });

    if (game.length > 0) {
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
    const gamesInTheBox = await findAllListedGameByUserId({
      userId: userId,
      boxId: customBoxId,
    });

    // Obtém informações sobre o plano do usuário
    const userPlan = getPlanInfos(user.plan);
    const boxLimit = userPlan?.gameLimit ?? 0;

    // Veirifica se o usuário atingiu o limite máximo de jogos dentro da caixa, se sim, retorna
    const limitExceeded = gamesInTheBox.length >= boxLimit;

    if (limitExceeded) {
      throw new CustomError("Limite máximo de jogos dentro de caixa.");
    }

    await addListedGame({
      userId: userId,
      gameId: gameId,
      boxId: customBoxId,
    });

    // Atualiza o conteúdo da página
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
