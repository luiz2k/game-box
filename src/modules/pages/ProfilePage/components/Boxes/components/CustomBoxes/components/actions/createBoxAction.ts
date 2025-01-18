"use server";

import { createCustomBox } from "@/modules/shared/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

type CreateBoxAction = {
  name: string;
  userId: number;
};
export async function createBoxAction({ name, userId }: CreateBoxAction) {
  try {
    await createCustomBox({
      userId: userId,
      name: name,
    });

    revalidatePath(`/perfil`);
  } catch {
    return {
      messages: {
        error: "Ocorreu um erro ao criar a caixa. Tente novamente.",
      },
    };
  }
}
