"use server";

import { auth } from "@/auth";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { stripeCreateCheckout } from "@/modules/shared/lib/stripe/stripe";
import { CustomError } from "@/modules/shared/utils/errorHandler";
import { redirect } from "next/navigation";

// Ação para criar uma sessão de checkout
export async function createCheckoutAction() {
  // Variável para armazenar a URL da sessão de checkout
  let checkoutUrl: string | null = null;

  try {
    // Obtém a sessão do usuário, se nao encontrar, redireciona para a página inicial
    const session = await auth();

    if (!session) {
      throw new CustomError(
        "Erro ao uma criar a sessão de checkout, por favor, tente novamente!",
      );
    }

    // Busca o usuário pelo ID, se nao encontrar, redireciona para a página inicial
    const user = await findUserById({
      userId: +session.user.id,
    });

    if (!user) {
      throw new CustomError(
        "Erro ao uma criar a sessão de checkout, por favor, tente novamente!",
      );
    }

    // Cria a sessão de checkout, se não conseguir, lança um erro
    const createCheckout = await stripeCreateCheckout({
      userEmail: user.email,
    });

    if (!createCheckout) {
      throw new CustomError(
        "Erro ao uma criar a sessão de checkout, por favor, tente novamente!",
      );
    }

    // Atribui a URL da sessão de checkout
    checkoutUrl = createCheckout;
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
  } finally {
    // Se houver uma URL de checkout, redireciona para ela
    if (checkoutUrl) {
      redirect(checkoutUrl);
    }
  }
}
