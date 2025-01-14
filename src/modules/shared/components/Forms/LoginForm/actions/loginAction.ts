"use server";

import { prisma } from "@/modules/lib/prisma/prisma";
import { loginSchema } from "../schemas/loginSchema";
import { compare } from "bcryptjs";
import { signIn } from "@/auth";

// Ação de logar um usuário
export async function loginForm(_prev: unknown, formData: FormData) {
  try {
    // Converte os dados do formulário em um objeto
    const data = Object.fromEntries(formData);

    // Valida os dados usando o esquema definido
    const isValid = loginSchema.safeParse(data);

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
    const { email, password } = isValid.data;

    // Verifica se o usuário já existe no banco
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return {
        messages: {
          error: "E-mail ou senha incorretos.",
        },
        inputValues: data, // Retorna os valores do formulário
      };
    }

    // Verifica se a senha é valida
    const passwordIsValid = await compare(password, userExists.password);

    if (!passwordIsValid) {
      return {
        messages: {
          error: "E-mail ou senha incorretos.",
        },
        inputValues: data, // Retorna os valores do formulário
      };
    }

    // Se tudo estiver OK, loga o usuário com o Auth.js
    await signIn("credentials", {
      redirect: false,
      id: userExists.id,
      username: userExists.username,
    });

    return {
      messages: {
        success: "Login realizado com sucesso.",
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
