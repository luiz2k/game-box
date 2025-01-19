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
export async function removeGameToStandardBoxAction(
  data: RemoveGameToStandardBoxAction,
) {
  // Verifica se o jogo está dentro da caixa, se não, retorna
  const standardBox = await findAllStandardBoxByUserId({
    userId: data.userId,
    gameId: data.gameId,
    box: data.box,
  });

  if (standardBox.length === 0) {
    return {
      messages: {
        error: "Jogo não encontrado na caixa.",
      },
    };
  }

  // Remove o jogo da caixa
  await removeGameToStandardBox({
    userId: data.userId,
    gameId: data.gameId,
    box: data.box,
  });

  // Atualiza a página
  revalidatePath(`/perfil/caixa/padrao/${data.box.toLocaleLowerCase()}`);
}
