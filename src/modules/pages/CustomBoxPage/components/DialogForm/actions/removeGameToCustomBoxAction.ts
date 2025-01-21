"use server";

import {
  findAllListedGameByUserId,
  removeListedGame,
} from "@/modules/shared/lib/prisma/listedGame";
import { revalidatePath } from "next/cache";

type RemoveGameToCustomBoxAction = {
  userId: number;
  boxId: number;
  gameId: number;
};

// Remove um jogo de uma caixa padrão
export async function removeGameToCustomBoxAction(
  data: RemoveGameToCustomBoxAction,
) {
  // Verifica se o jogo está dentro da caixa, se não, retorna
  const standardBox = await findAllListedGameByUserId({
    userId: data.userId,
    gameId: data.gameId,
    boxId: data.boxId,
  });

  if (standardBox.length === 0) {
    return {
      messages: {
        error: "Jogo não encontrado na caixa.",
      },
    };
  }

  // Remove o jogo da caixa
  await removeListedGame({
    userId: data.userId,
    gameId: data.gameId,
    boxId: data.boxId,
  });

  // Atualiza a página
  revalidatePath(`/perfil/caixa/customizada/${data.boxId}`);
}
