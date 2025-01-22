import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Lida com a obtenção da sessão do usuário e com o controle das rotas privadas
export async function authSession() {
  // Obtém os dados da sessão
  const session = await auth();

  // Se os dados não for encontrados, redireciona para a página inicial
  if (!session) {
    return redirect("/");
  }

  if (!session?.expires) {
    return redirect("/");
  }

  if (!session?.user?.id) {
    return redirect("/");
  }

  if (!session?.user?.username) {
    return redirect("/");
  }

  return {
    expires: session.expires,
    id: +session.user.id as number,
    username: session.user.username as string,
  };
}
