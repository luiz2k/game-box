"use server";

import { revalidatePath } from "next/cache";
import {
  CreateBoxSchema,
  createBoxSchema,
} from "../../validations/createBoxSchema";
import { createCustomBox } from "@/modules/shared/lib/prisma/customBox";
import { CustomError } from "@/modules/shared/utils/errorHandler";

type CreateBoxAction = {
  formData: FormData;
  userId: number;
};

// Ação de criar uma caixa
export async function createBoxAction({ formData, userId }: CreateBoxAction) {
  try {
    // Converte os dados do formulário em um objeto
    const data = Object.fromEntries(formData);

    // Valida os dados usando o esquema definido
    const isValid = createBoxSchema.safeParse(data);

    if (!isValid.success) {
      throw new CustomError(
        "Por favor, preencha todos os campos corretamente.",
        {
          inputErrors: isValid.error.flatten().fieldErrors,
          inputValues: data,
        },
      );
    }

    // Cria uma nova caixa
    await createCustomBox({
      userId: userId,
      boxName: isValid.data.name,
    });

    // Atualiza as informações da página
    revalidatePath(`/perfil`);

    return {
      messages: {
        success: "Caixa criada com sucesso.",
      },
    };
  } catch (error) {
    if (error instanceof CustomError) {
      return {
        messages: {
          error: error.message,
        },
        inputErrors: error.others?.inputErrors as CreateBoxSchema,
        inputValues: error.others?.inputValues as CreateBoxSchema,
      };
    }

    return {
      messages: {
        error: "Ocorreu um erro inesperado, por favor, tente novamente.",
      },
    };
  }
}
