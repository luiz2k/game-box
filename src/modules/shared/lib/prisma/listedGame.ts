import { prisma } from "./prisma";

type FindAllListedGameByUserId = {
  userId: number;
  boxId?: number;
  gameId?: number;
};

// Obtém todos os jogos listados na caixa customizada
export async function findAllListedGameByUserId({
  userId,
  boxId,
  gameId,
}: FindAllListedGameByUserId) {
  const games = await prisma.listedGame.findMany({
    where: {
      userId: userId,
      customBoxId: boxId,
      gameId: gameId,
    },
    include: {
      Game: true, // Inclui os dados do jogo
    },
  });

  return games;
}

type RemoveGameToCustomBox = {
  userId: number;
  gameId?: number;
  boxId?: number;
};

// Remove um jogo listado na caixa customizada
export async function removeListedGame({
  userId,
  boxId,
  gameId,
}: RemoveGameToCustomBox) {
  await prisma.listedGame.deleteMany({
    where: {
      userId: userId,
      gameId: gameId,
      customBoxId: boxId,
    },
  });
}

type AddGameToCustomBox = {
  userId: number;
  gameId: number;
  boxId: number;
};

// Lista um jogo na caixa customizada
export async function addListedGame({
  userId,
  boxId,
  gameId,
}: AddGameToCustomBox) {
  await prisma.listedGame.createMany({
    data: {
      userId: userId,
      gameId: gameId,
      customBoxId: boxId,
    },
  });
}
