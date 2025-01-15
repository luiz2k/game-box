"use server";

import { prisma } from "@/modules/shared/lib/prisma/prisma";
import { hash } from "bcryptjs";
import { registerSchema } from "../validations/registerSchema";
import { stripeCreateCustomer } from "@/modules/shared/lib/stripe/stripe";

// Ação de registrar um usuário
export async function registerAction(_prev: unknown, formData: FormData) {
  try {
    // Converte os dados do formulário em um objeto
    const data = Object.fromEntries(formData);

    // Valida os dados usando o esquema definido
    const isValid = registerSchema.safeParse(data);

    if (!isValid.success) {
      return {
        messages: {
          error: "Por favor, preencha todos os campos corretamente.",
        },
        inputErrors: isValid.error?.flatten().fieldErrors, // Retorna os erros de validação
        inputValues: data, // Retorna os valores do formulário
      };
    }

    // Desestrutura os dados do formulário
    const { username, email, password } = isValid.data;

    // Verifica se o usuário já existe no banco
    const userExist = await prisma.user.count({
      where: {
        email,
      },
    });

    if (userExist > 0) {
      return {
        messages: {
          error: "E-mail já cadastrado.",
        },
        inputValues: data, // Retorna os valores do formulário
      };
    }

    // Cria o cliente no Stripe
    const customer = await stripeCreateCustomer({ username, email });

    // Cria o hash da senha
    const hashedPassword = await hash(password, 10);

    // Cria o usuário no banco de dados
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        stripeCustomerId: customer.customerId,
        stripeSubscriptionId: customer.subscriptionId,
      },
    });

    return {
      messages: {
        success: "Cadastro realizado com sucesso.",
      },
    };
  } catch (error) {
    console.error("Ocorreu um erro inesperado:", error);

    return {
      messages: {
        error: "Ocorreu um erro inesperado. Por favor, tente novamente.",
      },
    };
  }
}
