import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { Cover } from "./components/Cover/Cover";
import { PopularGames } from "./components/PopularGames/PopularGames";
import { auth } from "@/auth";
import { prisma } from "@/modules/shared/lib/prisma/prisma";

export async function HomePage() {
  // Obtém a sessão do usuário
  const session = await auth();

  // Se o usuário estiver autenticado, obtem os dados do usuário
  const user =
    session &&
    (await prisma.user.findUnique({
      where: {
        id: +session?.user.id,
      },
    }));

  return (
    <>
      <Cover />

      <PopularGames />

      {/* Só exibe o cartão de assinatura se o plano do usuário for gratuito ou se o usuário nao estiver autenticado */}
      {(user?.plan === "Free" || !user) && <SubscriptionCard />}
    </>
  );
}
