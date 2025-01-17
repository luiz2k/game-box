"use server";

import {
  addGameToStandardBox,
  findAllStandardBoxByUserId,
} from "@/modules/shared/lib/prisma/prisma";
import { Box } from "@prisma/client";

type AddGameToStandardBoxAction = {
  userId: number;
  gameId: number;
  box: Box;
};

// Adiciona um jogo em uma caixa padrão
export async function addGameToStandardBoxAction(
  data: AddGameToStandardBoxAction,
) {
  // Verifica se o jogo ja foi adicionado na caixa, se sim, retorna
  const standardBox = await findAllStandardBoxByUserId({
    userId: data.userId,
    gameId: data.gameId,
    box: data.box,
  });

  if (standardBox.length > 0) {
    return;
  }

  // Adiciona o jogo na caixa
  await addGameToStandardBox({
    userId: data.userId,
    gameId: data.gameId,
    box: data.box,
  });
}
