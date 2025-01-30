import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Se o usuário não estiver autenticado, redireciona para a página inicial
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return children;
}
