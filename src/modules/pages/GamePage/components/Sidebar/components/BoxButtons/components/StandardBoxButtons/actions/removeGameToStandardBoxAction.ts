"use server";

import {
  findAllStandardBoxByUserId,
  removeGameToStandardBox,
} from "@/modules/shared/lib/prisma/prisma";
import { Box } from "@prisma/client";

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
    return;
  }

  // Remove o jogo da caixa
  await removeGameToStandardBox({
    userId: data.userId,
    gameId: data.gameId,
    box: data.box,
  });
}
