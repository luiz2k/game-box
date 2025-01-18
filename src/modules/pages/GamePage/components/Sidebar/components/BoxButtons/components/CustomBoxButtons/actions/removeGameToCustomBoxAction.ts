import { removeListedGameByUserId } from "@/modules/shared/lib/prisma/prisma";

type RemoveGameToCustomBoxAction = {
  userId: number;
  gameId?: number;
  customBoxId?: number;
};

export async function removeGameToCustomBoxAction({
  userId,
  gameId,
  customBoxId,
}: RemoveGameToCustomBoxAction) {
  await removeListedGameByUserId({
    userId: userId,
    gameId: gameId,
    customBoxId: customBoxId,
  });
}
