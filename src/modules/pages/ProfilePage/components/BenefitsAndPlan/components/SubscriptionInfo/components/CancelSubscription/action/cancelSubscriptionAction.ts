"use server";

import { auth } from "@/auth";
import { prisma } from "@/modules/shared/lib/prisma/prisma";
import { stripeCancelSubscription } from "@/modules/shared/lib/stripe/stripe";
import { CustomError } from "@/modules/shared/utils/errorHandler";
import { revalidatePath } from "next/cache";

// Ação de cancelar uma assinatura
export async function cancelSubscriptionAction() {
  try {
    // Verifica se o usuário está autenticado, se não, lança um erro
    const session = await auth();

    if (!session) {
      throw new CustomError(
        "Ocorreu um erro inesperado, por favor, tente novamente.",
      );
    }

    // Verifica se o usuário possui uma assinatura, se nao, lança um erro
    const user = await prisma.user.findUnique({
      where: {
        id: +session.user.id,
      },
      select: {
        stripeSubscriptionId: true,
      },
    });

    if (!user || !user.stripeSubscriptionId) {
      throw new CustomError("O usuário não possui uma assinatura.");
    }

    // Cancela a assinatura
    await stripeCancelSubscription({
      subscriptionId: user.stripeSubscriptionId,
    });

    revalidatePath("/perfil");

    return {
      messages: {
        success: "Assinatura cancelada com sucesso.",
      },
    };
  } catch (error) {
    if (error instanceof CustomError) {
      return {
        messages: {
          error: error.message,
        },
      };
    }

    return {
      messages: {
        error: "Ocorreu um erro inesperado, por favor, tente novamente.",
      },
    };
  }
}
