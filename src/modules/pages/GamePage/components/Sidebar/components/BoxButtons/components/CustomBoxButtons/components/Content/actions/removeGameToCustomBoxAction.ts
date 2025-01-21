"use server";

import {
  findAllListedGameByUserId,
  removeListedGameByUserId,
} from "@/modules/shared/lib/prisma/prisma";
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
      customBoxId: customBoxId,
    });

    if (!game) {
      throw "Jogo não encontrado dentro da caixa.";
    }

    await removeListedGameByUserId({
      userId: userId,
      gameId: gameId,
      customBoxId: customBoxId,
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
