import { prisma } from "./prisma";

type findUserById = {
  userId: number;
};

// Obtém os dados do usuário pelo ID
export async function findUserById({ userId }: findUserById) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      plan: true,
    },
  });

  return user;
}
