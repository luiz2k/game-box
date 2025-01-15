import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string({ message: "Informe um nome de usuário" })
      .min(2, { message: "O nome de usuário deve ter no mínimo 2 caracteres." })
      .max(60, {
        message: "O nome de usuário deve ter no máximo 60 caracteres.",
      }),
    email: z
      .string({ message: "Informe um e-mail." })
      .email({ message: "Informe um e-mail válido." }),
    password: z
      .string({ message: "Informe uma senha." })
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." })
      .max(60, { message: "A senha deve ter no máximo 60 caracteres." }),
    confirmPassword: z.string({ message: "Confirme sua senha." }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas devem ser iguais.",
  });
