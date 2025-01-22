import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "O dado deve ser do tipo string." })
    .min(1, { message: "Informe um e-mail." }),
  password: z
    .string({ message: "O dado deve ser do tipo string." })
    .min(1, { message: "Informe uma senha." }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
