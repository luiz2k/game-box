import { Box } from "@prisma/client";
import { prisma } from "./prisma";

type FindStandardBoxByName = {
  userId: number;
  gameId?: number;
  boxName?: Box;
};

// Busca as caixas padrão pelo ID do usuário
export async function findAllStandardBoxByUserId({
  userId,
  gameId,
  boxName,
}: FindStandardBoxByName) {
  const standardBox = await prisma.standardBox.findMany({
    where: {
      userId: userId,
      gameId: gameId,
      box: boxName,
    },
    include: {
      Game: true, // Inclui os dados do jogo
    },
  });

  return standardBox;
}

type AddGameToBox = {
  userId: number;
  gameId: number;
  boxName: Box;
};

// Adiciona o jogo em uma caixa padrão
export async function addGameToStandardBox({
  userId,
  gameId,
  boxName,
}: AddGameToBox) {
  await prisma.standardBox.create({
    data: {
      userId: userId,
      gameId: gameId,
      box: boxName,
    },
  });
}

type RemoveGameToStandardBox = {
  userId: number;
  gameId: number;
  boxName: Box;
};

// Remove o jogo de uma caixa padrão
export async function removeGameToStandardBox({
  userId,
  gameId,
  boxName,
}: RemoveGameToStandardBox) {
  await prisma.standardBox.deleteMany({
    where: {
      userId: userId,
      gameId: gameId,
      box: boxName,
    },
  });
}
