"use server";

import { signOut } from "@/auth";

// Ação de deslogar um usuário
export async function signOutAction() {
  await signOut();
}
