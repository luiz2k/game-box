import { prisma } from "./prisma";

type FindUserById = {
  userId: number;
};

// Obtém os dados do usuário pelo ID
export async function findUserById({ userId }: FindUserById) {
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

type FindUserByEmail = {
  email: string;
};

// Obtém os dados do usuário pelo E-mail
export async function findUserByEmail({ email }: FindUserByEmail) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    omit: {
      password: true,
    },
  });

  return user;
}

type FindUserByStripeCustomerId = {
  stripeCustomerId: string;
};

// Obtém os dados do usuário pelo seu Id no Stripe
export async function findUserByStripeCustomerId({
  stripeCustomerId,
}: FindUserByStripeCustomerId) {
  const user = await prisma.user.findUnique({
    where: {
      stripeCustomerId: stripeCustomerId,
    },
    omit: {
      password: true,
    },
  });

  return user;
}

type UpdatedUserPlan = {
  userId: number;
  SubscriptionId: string;
  plan: string;
};

// Atualiza o plano do usuário
export async function updatedUserPlan({
  userId,
  SubscriptionId,
  plan,
}: UpdatedUserPlan) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      stripeSubscriptionId: SubscriptionId,
      plan: plan,
    },
  });
}
