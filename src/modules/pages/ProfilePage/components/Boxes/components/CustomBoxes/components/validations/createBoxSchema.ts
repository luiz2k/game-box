import { z } from "zod";

// Valida os dados do formulário de criação de caixa
export const createBoxSchema = z.object({
  name: z
    .string({ message: "O dado deve ser do tipo string." })
    .min(2, { message: "O nome da caixa deve ter no mínimo 2 caracteres." })
    .max(25, { message: "O nome da caixa deve ter no máximo 25 caracteres." }),
});
