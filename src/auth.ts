import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
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
  callbacks: {
    jwt: async ({ token, user }) => {
      // Se o usuário acabou de logar, adicione os dados do usuário ao token
      if (user?.id && user?.username) {
        token.user = {
          id: user.id,
          username: user.username,
        };
      }

      // Mantém o token anterior
      return token;
    },
    session: async ({ session, token }) => {
      // Adicione os dados do token na sessão
      if (token) {
        session.user = token.user;
      }

      return session;
    },
  },
});
