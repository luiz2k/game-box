import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { BenefitsInfo } from "./components/BenefitsInfo/BenefitsInfo";
import { SubscriptionInfo } from "./components/SubscriptionInfo/SubscriptionInfo";
import { auth } from "@/auth";
import { findUserById } from "@/modules/shared/lib/prisma/user";

export async function SignatureInfo() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await findUserById({
    userId: +session.user.id,
  });

  return (
    <div className="flex flex-col gap-4 min-[962px]:flex-row">
      <BenefitsInfo />

      <SubscriptionInfo />

      {/* Só exibe o cartão de assinatura se o plano do usuário for gratuito */}
      {user?.plan === "Free" && <SubscriptionCard />}
    </div>
  );
}
