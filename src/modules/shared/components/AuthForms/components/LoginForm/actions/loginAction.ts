"use server";

import { signIn } from "@/auth";
import { prisma } from "@/modules/shared/lib/prisma/prisma";
import { compare } from "bcryptjs";
import { LoginSchema, loginSchema } from "../validations/loginSchema";
import { CustomError } from "@/modules/shared/utils/errorHandler";

// Ação de logar um usuário
export async function loginAction(_prev: unknown, formData: FormData) {
  try {
    // Converte os dados do formulário em um objeto
    const data = Object.fromEntries(formData);

    // Valida os dados usando o esquema definido
    const isValid = loginSchema.safeParse(data);

    if (!isValid.success) {
      throw new CustomError(
        "Por favor, preencha todos os campos corretamente.",
        {
          inputErrors: isValid.error?.flatten().fieldErrors, // Retorna os erros de validação
          inputValues: data, // Retorna os valores anteriormente preenchidos
        },
      );
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
      throw new CustomError("E-mail ou senha incorretos.", {
        inputValues: data, // Retorna os valores anteriormente preenchidos
      });
    }

    // Verifica se a senha é valida
    const passwordIsValid = await compare(password, userExists.password);

    if (!passwordIsValid) {
      throw new CustomError("E-mail ou senha incorretos.", {
        inputValues: data, // Retorna os valores anteriormente preenchidos
      });
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
    if (error instanceof CustomError) {
      return {
        messages: {
          error: error.message,
        },
        inputErrors: error.others?.inputErrors as LoginSchema,
        inputValues: error.others?.inputValues as LoginSchema,
      };
    }

    return {
      messages: {
        error: "Ocorreu um erro inesperado, por favor, tente novamente.",
      },
    };
  }
}
