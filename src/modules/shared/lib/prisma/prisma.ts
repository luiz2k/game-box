import { PrismaClient, Box } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Obtém os dados do usuário pelo ID
export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      username: true,
      plan: true,
    },
  });

  return user;
}

// Busca todos os jogos
export async function findAllGames() {
  const games = await prisma.game.findMany();

  return games;
}

// Busca um jogo pelo ID
export async function findGameById(id: number) {
  const game = await prisma.game.findUnique({
    where: {
      id: id,
    },
  });

  return game;
}

type FindStandardBoxByName = {
  userId: number;
  gameId?: number;
  box?: Box;
};

// Busca as caixas padrão pelo ID do usuário
export async function findAllStandardBoxByUserId(data: FindStandardBoxByName) {
  const standardBox = await prisma.standardBox.findMany({
    where: {
      userId: data.userId,
      gameId: data.gameId,
      box: data.box,
    },
  });

  return standardBox;
}

type AddGameToBox = {
  userId: number;
  gameId: number;
  box: Box;
};

// Adiciona o jogo em uma caixa padrão
export async function addGameToStandardBox(data: AddGameToBox) {
  await prisma.standardBox.create({
    data: {
      userId: data.userId,
      gameId: data.gameId,
      box: data.box,
    },
  });
}

type RemoveGameToBox = {
  userId: number;
  gameId: number;
  box: Box;
};

// Remove o jogo de uma caixa padrão
export async function removeGameToStandardBox(data: RemoveGameToBox) {
  await prisma.standardBox.deleteMany({
    where: {
      userId: data.userId,
      gameId: data.gameId,
      box: data.box,
    },
  });
}
