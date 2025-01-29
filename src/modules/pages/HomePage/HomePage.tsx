import { auth } from "@/auth";
import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { Cover } from "./components/Cover/Cover";
import { PopularGames } from "./components/PopularGames/PopularGames";

export async function HomePage() {
  // Obtém a sessão do usuário
  const session = await auth();

  let user = null;

  // Se o usuário estiver autenticado, obtém os dados do usuário
  if (session && session?.user?.id) {
    user = await findUserById({
      userId: +session.user.id,
    });
  }

  return (
    <>
      <Cover />
      <PopularGames />
      {/* Exibe o cartão de assinatura apenas se o plano do usuário for gratuito ou se não estiver autenticado */}
      {!user || user.plan === "Free" ? <SubscriptionCard /> : null}
    </>
  );
}
