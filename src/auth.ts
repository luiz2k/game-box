import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: {},
        username: {},
      },
      authorize: async (credentials) => {
        // Verifique se os campos obrigatórios estão presentes
        if (!credentials.id || !credentials.username) {
          return null;
        }

        // Se tudo estiver OK, retorne os dados do usuário
        return {
          id: credentials.id as string,
          username: credentials.username as string,
        };
      },
    }),
  ],
});
