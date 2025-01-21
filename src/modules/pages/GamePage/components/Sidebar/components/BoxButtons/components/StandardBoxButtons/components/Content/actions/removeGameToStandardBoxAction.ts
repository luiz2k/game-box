"use server";

import {
  findAllStandardBoxByUserId,
  removeGameToStandardBox,
} from "@/modules/shared/lib/prisma/prisma";
import { Box } from "@prisma/client";
import { revalidatePath } from "next/cache";

type RemoveGameToStandardBoxAction = {
  userId: number;
  gameId: number;
  box: Box;
};

// Remove um jogo de uma caixa padrão
export async function removeGameToStandardBoxAction({
  userId,
  gameId,
  box,
}: RemoveGameToStandardBoxAction) {
  try {
    // Verifica se o jogo está dentro da caixa, se não, retorna um erro
    const standardBox = await findAllStandardBoxByUserId({
      userId,
      gameId,
      box,
    });

    if (standardBox.length === 0) {
      throw "Jogo não encontrado dentro da caixa.";
    }

    // Remove o jogo da caixa
    await removeGameToStandardBox({
      userId: userId,
      gameId: gameId,
      box: box,
    });

    // Atualiza os dados da página
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
