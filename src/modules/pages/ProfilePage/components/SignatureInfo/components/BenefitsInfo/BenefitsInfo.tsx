import { auth } from "@/auth";
import { findAllCustomBoxByUserId } from "@/modules/shared/lib/prisma/customBox";
import { findUserById } from "@/modules/shared/lib/prisma/user";
import { getPlanInfos } from "@/modules/shared/utils/plains";

export async function BenefitsInfo() {
  const session = await auth();

  // Obtém os dados do usuário pelo ID
  const user = await findUserById({
    userId: +session?.user.id,
  });

  if (!user) {
    return null;
  }

  // Verifica os limites do plano do usuário
  const planInfos = getPlanInfos(user.plan);

  // Obtém as caixas do usuário
  const userBoxes = await findAllCustomBoxByUserId({
    userId: +session?.user.id,
  });

  return (
    <div className="min-w-[18.75rem] space-y-5 rounded-2xl bg-black-2 p-4">
      <h2 className="text-2xl font-bold">Seus benefícios</h2>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-bold">Plano atual:</span> {planInfos?.name}
        </p>
        <p>
          <span className="font-bold">Suas caixas:</span> {userBoxes.length} /{" "}
          {planInfos?.boxLimit}
        </p>
        <p>
          <span className="font-bold">Jogos por caixa:</span>{" "}
          {planInfos?.gameLimit}
        </p>
      </div>
    </div>
  );
}
