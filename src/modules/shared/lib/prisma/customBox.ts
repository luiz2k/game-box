import { prisma } from "./prisma";

type CreateCustomBox = {
  userId: number;
  boxName: string;
};

// Cria uma caixa customizada
export async function createCustomBox({ userId, boxName }: CreateCustomBox) {
  await prisma.customBox.create({
    data: {
      userId: userId,
      name: boxName,
    },
  });
}

type FindCustomBoxByUserId = {
  boxId: number;
  userId: number;
};

// Busca uma caixa customizada pelo id
export async function findCustomBoxByUserId({
  boxId,
  userId,
}: FindCustomBoxByUserId) {
  const customBox = await prisma.customBox.findUnique({
    where: {
      id: boxId,
      userId: userId,
    },
  });

  return customBox;
}

type FindAllCustomBoxByUserId = {
  userId: number;
};

// Busca todas as caixas pelo id do usuário
export async function findAllCustomBoxByUserId({
  userId,
}: FindAllCustomBoxByUserId) {
  const customBox = await prisma.customBox.findMany({
    where: {
      userId: userId,
    },
  });

  return customBox;
}

type DeleteCustomBox = {
  boxId: number;
  userId: number;
};

// Remove uma caixa customizada
export async function deleteCustomBox(data: DeleteCustomBox) {
  await prisma.customBox.delete({
    where: {
      id: data.boxId,
      userId: data.userId,
    },
  });
}
