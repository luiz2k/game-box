import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";

export function SignatureInfo() {
  return (
    <div className="flex flex-col gap-4 min-[945px]:flex-row">
      <div className="min-w-[18.75rem] space-y-5 rounded-2xl bg-black-2 p-4">
        <h2 className="text-2xl font-bold">Sua assinatura</h2>

        <div className="space-y-1 text-sm">
          <p>
            <span className="font-bold">Plano atual:</span> Gratuito
          </p>
          <p>
            <span className="font-bold">Caixas:</span> 1/2
          </p>
          <p>
            <span className="font-bold">Jogos por caixa:</span> 7
          </p>
        </div>
      </div>

      <div className="flex-grow">
        <SubscriptionCard />
      </div>
    </div>
  );
}
