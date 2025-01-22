import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { findAllCustomBoxByUserId } from "@/modules/shared/lib/prisma/customBox";
import { getPlanInfos } from "@/modules/shared/utils/plains";
import { twMerge } from "tailwind-merge";

type SignatureInfoProps = {
  plan: string;
  session: {
    expires: string;
    id: number;
    username: string;
  };
};

export async function SignatureInfo({ plan, session }: SignatureInfoProps) {
  // Obtém as informações do plano do usuário
  const planInfos = getPlanInfos(plan);

  // Obtém as caixas do usuário
  const userBoxes = await findAllCustomBoxByUserId({
    userId: session.id,
  });

  return (
    <div className="flex flex-col gap-4 min-[962px]:flex-row">
      <div
        className={twMerge(
          "min-w-[18.75rem] space-y-5 rounded-2xl bg-black-2 p-4",
          planInfos?.name === "Premium" && "w-full",
        )}
      >
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
        {planInfos?.name === "Free" && <SubscriptionCard session={session} />}
      </div>
    </div>
  );
}
