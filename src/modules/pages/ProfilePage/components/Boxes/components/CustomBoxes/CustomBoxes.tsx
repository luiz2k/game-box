import {
  findAllCustomBoxByUserId,
  getUserById,
} from "@/modules/shared/lib/prisma/prisma";
import { authSession } from "@/modules/shared/utils/session";
import Link from "next/link";
import {
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardTitle,
  BoxCardWrapper,
} from "../../../BoxCard/BoxCard";
import { BoxCardHeaderActionCustom } from "./components/BoxCardHeaderActionCustom/BoxCardHeaderActionCustom";
import { CreateBox } from "./components/CreateBox/CreateBox";
import { DeleteBox } from "./components/DeleteBox/DeleteBox";
import { DoNotAllowToCreateBox } from "./components/DoNotAllowToCreateBox/DoNotAllowToCreateBox";
import { getPlanInfos } from "@/modules/shared/utils/plains";
import { redirect } from "next/navigation";

export async function CustomBoxes() {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  const [userBoxes, user] = await Promise.all([
    findAllCustomBoxByUserId(session.id), // Busca todas as caixas que o usuário criou
    getUserById(session.id), // Busca o usuário pelo ID
  ]);

  if (!user) {
    redirect("/"); // Redireciona se o usuário não existir
  }

  // Obtém informações sobre o plano do usuário
  const userPlan = getPlanInfos(user.plan);

  // Limite de caixas disponíveis no plano do usuário
  const boxLimit = userPlan?.boxLimit ?? 0;

  // Veirifica se o usuário atingiu o limite de caixas disponíveis no seu plano
  const limitExceeded = userBoxes.length >= boxLimit;

  return (
    <div className="grid gap-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Suas caixas</h2>
        {limitExceeded && (
          <p className="text-white-1/50">
            Faça sua assinatura e crie suas própias caixas!
          </p>
        )}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(12.5rem,_1fr))] gap-4">
        {userBoxes.map((box) => (
          <Link key={box.id} href={`/perfil/caixa/customizada/${box.id}`}>
            <BoxCardWrapper>
              <BoxCardHeader>
                <BoxCardHeaderContent title={box.name} />

                <BoxCardHeaderActionCustom id={box.id} name={box.name} />
              </BoxCardHeader>

              <BoxCardTitle>{box.name}</BoxCardTitle>
            </BoxCardWrapper>
          </Link>
        ))}

        {/* Se o usuário não tiver caixas disponíveis, bloqueia a criação de novas caixas */}
        {limitExceeded ? (
          <>
            <DoNotAllowToCreateBox />
          </>
        ) : (
          <>
            <CreateBox userId={session.id} />
          </>
        )}
      </div>

      <DeleteBox userId={session.id} />
    </div>
  );
}
