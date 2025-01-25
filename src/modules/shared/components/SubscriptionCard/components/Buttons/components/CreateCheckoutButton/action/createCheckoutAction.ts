"use server";

import { auth } from "@/auth";
import { prisma } from "@/modules/shared/lib/prisma/prisma";
import { stripeCreateCheckout } from "@/modules/shared/lib/stripe/stripe";

export async function createCheckoutAction() {
  // Obtém a sessão do usuário
  const session = await auth();

  // Obtém o e-mail do usuário
  const user = await prisma.user.findUnique({
    where: {
      id: +session?.user.id,
    },
    select: {
      email: true,
    },
  });

  // Se encontrar o usuário inicia a sessão de checkout
  if (user) {
    await stripeCreateCheckout({ userEmail: user.email });
  }
}
