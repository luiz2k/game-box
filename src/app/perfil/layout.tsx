import { authSession } from "@/modules/shared/utils/session";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Bloqueia o acesso se o usuário não estiver autenticado
  await authSession();

  return children;
}
