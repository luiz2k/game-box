"use server";

import { deleteCustomBox } from "@/modules/shared/lib/prisma/customBox";
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
  } catch {
    return {
      messages: {
        error: "Ocorreu um erro ao deletar a caixa. Tente novamente.",
      },
    };
  }
}
