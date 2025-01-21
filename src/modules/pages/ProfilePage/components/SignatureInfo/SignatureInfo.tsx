import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { findAllCustomBoxByUserId } from "@/modules/shared/lib/prisma/customBox";
import { getPlanInfos } from "@/modules/shared/utils/plains";
import { authSession } from "@/modules/shared/utils/session";

type SignatureInfoProps = {
  plan: string;
};

export async function SignatureInfo({ plan }: SignatureInfoProps) {
  const session = await authSession();

  const planInfos = getPlanInfos(plan);
  const userBoxes = await findAllCustomBoxByUserId({
    userId: session.id,
  });

  return (
    <div className="flex flex-col gap-4 min-[945px]:flex-row">
      <div className="min-w-[18.75rem] space-y-5 rounded-2xl bg-black-2 p-4">
        <h2 className="text-2xl font-bold">Sua assinatura</h2>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-bold">Plano atual:</span> {planInfos?.name}
          </p>
          <p>
            <span className="font-bold">Suas caixas:</span> {userBoxes.length} /{" "}
            {planInfos?.boxLimit}
          </p>
          <p>
            <span className="font-bold">Máximo de jogos por caixa:</span>{" "}
            {planInfos?.gameLimit}
          </p>
        </div>
      </div>

      <div className="flex-grow">
        {planInfos?.name === "Free" && <SubscriptionCard />}
      </div>
    </div>
  );
}
