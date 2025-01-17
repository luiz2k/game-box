import { PrismaClient } from "@prisma/client";

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
