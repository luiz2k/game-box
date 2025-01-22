import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { authSession } from "@/modules/shared/utils/session";
import { redirect } from "next/navigation";
import { Boxes } from "./components/Boxes/Boxes";
import { SignatureInfo } from "./components/SignatureInfo/SignatureInfo";

export async function ProfilePage() {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  // Obtém os dados do usuário pelo ID, se não encontrar, redireciona para a página inicial
  const user = await findUserById({
    userId: session.id,
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <section className="space-y-10">
      <PageTitle
        title="Perfil"
        desc={
          <>
            Bem-vindo <span className="font-bold">{session.username}</span>.
          </>
        }
      />

      <SignatureInfo plan={user.plan} session={session} />

      <Boxes />
    </section>
  );
}
