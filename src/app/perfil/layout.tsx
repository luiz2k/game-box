import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Bloqueia o acesso se o usuário não estiver autenticado
  const session = await auth();

  if (!session) {
    // Redireciona para a página inicial
    redirect("/");
  }

  return children;
}
