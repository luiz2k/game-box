import { auth } from "@/auth";
import { Check } from "lucide-react";
import { Button } from "../Button/Button";

export async function SubscriptionCard() {
  const session = await auth();

  return (
    <div className="space-y-5 rounded-2xl bg-black-2 p-4">
      <div className="flex flex-col justify-between gap-5 min-[962px]:flex-row min-[962px]:items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Faça já sua assinatura!</h2>
          <p>Comece sua jornada hoje com o plano perfeito para você</p>
        </div>

        <div className="space-y-1">
          <p className="min-[962px]:text-end">Plano mensal</p>
          <p className="text-4xl font-bold">R$ 24,99</p>
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
          Crie até 20 caixas
        </li>
      </ul>

      <Button width="full" variant="primary">
        {session
          ? "Faça já sua assinatura!"
          : "Crie uma conta e faça sua assinatura!"}
      </Button>
    </div>
  );
}
