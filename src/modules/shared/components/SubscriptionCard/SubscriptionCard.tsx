import { Check } from "lucide-react";
import { Button } from "../Button/Button";

export function SubscriptionCard() {
  return (
    <div className="space-y-5 rounded-2xl bg-black-2 p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl">Faça já sua assinatura!</h2>
          <p>Comece sua jornada hoje com o plano perfeito para você</p>
        </div>

        <div className="space-y-1">
          <p className="text-end">Plano mensal</p>
          <p className="text-4xl font-bold">R$ 24,99</p>
        </div>
      </div>

      <ul className="space-y-1">
        <li className="flex gap-1 text-sm">
          <span className="text-accent-1">
            <Check className="size-5" />
          </span>
          Categorize quantos jogos quiser
        </li>
        <li className="flex gap-1 text-sm">
          <span className="text-accent-1">
            <Check className="size-5" />
          </span>
          Crie até 20 categorias
        </li>
      </ul>

      <Button width="full" variant="primary">
        Faça já a sua assinatura!
      </Button>
    </div>
  );
}
