import { addGameToCustomBox } from "@/modules/shared/lib/prisma/prisma";

type AddGameToCustomBoxAction = {
  userId: number;
  gameId: number;
  customBoxId: number;
};

export async function addGameToCustomBoxAction(data: AddGameToCustomBoxAction) {
  await addGameToCustomBox({
    userId: data.userId,
    gameId: data.gameId,
    customBoxId: data.customBoxId,
  });
}
