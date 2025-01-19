import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { getUserById } from "@/modules/shared/lib/prisma/prisma";
import { authSession } from "@/modules/shared/utils/session";
import { redirect } from "next/navigation";
import { Boxes } from "./components/Boxes/Boxes";
import { SignatureInfo } from "./components/SignatureInfo/SignatureInfo";

export async function ProfilePage() {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  // Obtém os dados do usuário pelo ID, se não encontrar, redireciona para a página inicial
  const user = await getUserById(session.id);

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

      {user && <SignatureInfo plan={user.plan} />}

      <Boxes />
    </section>
  );
}
