"use server";

import { CustomError } from "@/modules/shared/utils/errorHandler";
import {
  deleteCustomBox,
  findCustomBoxByUserId,
} from "@/modules/shared/lib/prisma/customBox";
import { revalidatePath } from "next/cache";

type DeleteCustomBoxAction = {
  boxId: number;
  userId: number;
};

// Ação para apagar uma caixa customizada
export async function deleteBoxAction({
  boxId,
  userId,
}: DeleteCustomBoxAction) {
  try {
    // Busca a caixa que será excluido, se não encontrar, retorna
    const customBox = await findCustomBoxByUserId({
      boxId: boxId,
      userId: userId,
    });

    if (!customBox) {
      throw new CustomError("Caixa não encontrada.");
    }

    // Deleta a caixa
    await deleteCustomBox({
      boxId: boxId,
      userId: userId,
    });

    // Atualiza a página
    revalidatePath("/perfil");

    return {
      messages: {
        success: "Caixa deletada com sucesso.",
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
