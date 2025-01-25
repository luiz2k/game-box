import { auth } from "@/auth";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { redirect } from "next/navigation";
import { BenefitsAndPlan } from "./components/BenefitsAndPlan/BenefitsAndPlan";
import { Boxes } from "./components/Boxes/Boxes";

export async function ProfilePage() {
  // Obtém os dados da sessão do usuário
  const session = await auth();

  if (!session) {
    return null;
  }

  // Obtém os dados do usuário pelo ID, se não encontrar, redireciona para a página inicial
  const user = await findUserById({
    userId: +session.user.id,
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
            Bem-vindo <span className="font-bold">{session.user.username}</span>
            .
          </>
        }
      />

      <BenefitsAndPlan />

      <Boxes />
    </section>
  );
}
