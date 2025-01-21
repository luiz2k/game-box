import { prisma } from "./prisma";

// Busca todos os jogos
export async function findAllGames() {
  const games = await prisma.game.findMany();

  return games;
}

type FindGameById = {
  gameId: number;
};

// Busca um jogo pelo ID
export async function findGameById({ gameId }: FindGameById) {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
  });

  return game;
}
