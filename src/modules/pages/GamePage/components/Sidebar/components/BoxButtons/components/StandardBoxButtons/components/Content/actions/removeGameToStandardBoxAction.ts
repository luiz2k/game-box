"use server";

import { CustomError } from "@/modules/shared/utils/errorHandler";
import {
  findAllStandardBoxByUserId,
  removeGameToStandardBox,
} from "@/modules/shared/lib/prisma/standardBox";
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
      boxName: box,
    });

    if (standardBox.length === 0) {
      throw new CustomError("Jogo não encontrado dentro da caixa.");
    }

    // Remove o jogo da caixa
    await removeGameToStandardBox({
      userId: userId,
      gameId: gameId,
      boxName: box,
    });

    // Atualiza os dados da página
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
