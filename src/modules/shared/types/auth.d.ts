// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

// Define tipagem para o Auth.js
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
    };
  }
}
