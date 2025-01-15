import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { getPlanInfos } from "@/modules/shared/utils/plains";

type SignatureInfoProps = {
  plan: string;
};

export async function SignatureInfo({ plan }: SignatureInfoProps) {
  const planInfos = getPlanInfos(plan);

  return (
    <div className="flex flex-col gap-4 min-[945px]:flex-row">
      <div className="min-w-[18.75rem] space-y-5 rounded-2xl bg-black-2 p-4">
        <h2 className="text-2xl font-bold">Sua assinatura</h2>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-bold">Plano atual:</span> {planInfos?.name}
          </p>
          <p>
            <span className="font-bold">Caixas:</span> {planInfos?.boxLimit}
          </p>
          <p>
            <span className="font-bold">Jogos por caixa:</span>{" "}
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
