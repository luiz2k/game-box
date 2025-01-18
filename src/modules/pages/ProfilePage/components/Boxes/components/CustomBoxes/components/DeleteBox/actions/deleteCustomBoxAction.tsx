"use server";

import { deleteCustomBox } from "@/modules/shared/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

type DeleteCustomBoxAction = {
  boxId: number;
  userId: number;
};

// Ação para apagar uma caixa customizada
export async function deleteCustomBoxAction({
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
  } catch {
    return {
      messages: {
        error: "Ocorreu um erro ao deletar a caixa. Tente novamente",
      },
    };
  }
}
