"use server";

import {
  addGameToCustomBox,
  findAllListedGameByUserId,
  getUserById,
} from "@/modules/shared/lib/prisma/prisma";
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
      customBoxId: customBoxId,
    });

    if (game.length > 0) {
      throw "Jogo já adicionado dentro da caixa.";
    }

    // Obtém informações sobre o usuário, se não encontrar, retorna
    const user = await getUserById(userId);

    if (!user) {
      throw "Usuário não encontrado.";
    }

    // Obtém todos os jogos dentro da caixa
    const gamesInTheBox = await findAllListedGameByUserId({
      userId: userId,
      customBoxId: customBoxId,
    });

    // Obtém informações sobre o plano do usuário
    const userPlan = getPlanInfos(user.plan);
    const boxLimit = userPlan?.gameLimit ?? 0;

    // Veirifica se o usuário atingiu o limite máximo de jogos dentro da caixa, se sim, retorna
    const limitExceeded = gamesInTheBox.length >= boxLimit;

    if (limitExceeded) {
      throw "Limite máximo de jogos dentro de caixa.";
    }

    await addGameToCustomBox({
      userId: userId,
      gameId: gameId,
      customBoxId: customBoxId,
    });

    // Atualiza o conteúdo da página
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
