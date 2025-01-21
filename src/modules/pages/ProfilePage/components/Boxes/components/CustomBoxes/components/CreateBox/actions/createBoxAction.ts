"use server";

import { revalidatePath } from "next/cache";
import { createBoxSchema } from "../../validations/createBoxSchema";
import { createCustomBox } from "@/modules/shared/lib/prisma/customBox";

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
      return {
        messages: {
          error: "Por favor, preencha todos os campos corretamente.",
        },
        inputErrors: isValid.error.flatten().fieldErrors, // Retorna os erros de validação
        inputValues: data, // Retorna os valores do formulário
      };
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
  } catch {
    return {
      messages: {
        error: "Ocorreu um erro ao criar a caixa. Tente novamente.",
      },
    };
  }
}
