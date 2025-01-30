import { Check } from "lucide-react";
import { Buttons } from "./components/Buttons/Buttons";
import { stripeFindPremiumSignature } from "../../lib/stripe/stripe";

export async function SubscriptionCard() {
  // Busca as informações da assinatura premium
  const premiumSignature = await stripeFindPremiumSignature();

  if (!premiumSignature) {
    return null;
  }

  return (
    <div className="w-full space-y-5 rounded-2xl bg-black-2 p-4">
      <div className="flex flex-col justify-between gap-5 min-[962px]:flex-row min-[962px]:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Faça já sua assinatura!</h2>
          <p>Comece sua jornada hoje com o plano perfeito para você</p>
        </div>

        <div className="space-y-1">
          <p className="min-[962px]:text-end">
            Plano {premiumSignature?.recurring.interval}
          </p>
          <p className="text-4xl font-bold">{premiumSignature?.unit_amount}</p>
        </div>
      </div>

      <ul className="space-y-1">
        <li className="flex gap-1 text-sm">
          <span className="text-accent-1">
            <Check className="size-5" />
          </span>
          Adicione jogos ilimitadamente nas caixas
        </li>
        <li className="flex gap-1 text-sm">
          <span className="text-accent-1">
            <Check className="size-5" />
          </span>
          Crie quantas caixas quiser
        </li>
      </ul>

      <Buttons />
    </div>
  );
}
