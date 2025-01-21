"use server";

import {
  findAllListedGameByUserId,
  removeListedGame,
} from "@/modules/shared/lib/prisma/listedGame";
import { revalidatePath } from "next/cache";

type RemoveGameToCustomBoxAction = {
  userId: number;
  gameId?: number;
  customBoxId?: number;
};

export async function removeGameToCustomBoxAction({
  userId,
  gameId,
  customBoxId,
}: RemoveGameToCustomBoxAction) {
  try {
    // Verifica se o jogo está listado na caixa, caso não esteja, retorna um erro
    const game = findAllListedGameByUserId({
      userId: userId,
      gameId: gameId,
      boxId: customBoxId,
    });

    if (!game) {
      throw "Jogo não encontrado dentro da caixa.";
    }

    await removeListedGame({
      userId: userId,
      gameId: gameId,
      boxId: customBoxId,
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
