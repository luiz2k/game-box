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
export async function removeGameToStandardBoxAction(
  data: RemoveGameToStandardBoxAction,
) {
  try {
    // Verifica se o jogo está dentro da caixa, se não, retorna
    const standardBox = await findAllStandardBoxByUserId({
      userId: data.userId,
      gameId: data.gameId,
      boxName: data.box,
    });

    if (standardBox.length === 0) {
      throw new CustomError("Jogo não encontrado na caixa.");
    }

    // Remove o jogo da caixa
    await removeGameToStandardBox({
      userId: data.userId,
      gameId: data.gameId,
      boxName: data.box,
    });

    // Atualiza a página
    revalidatePath(`/perfil/caixa/padrao/${data.box.toLocaleLowerCase()}`);

    return {
      messages: {
        success: "Jogo removido com sucesso.",
      },
    };
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
