import { auth } from "@/auth";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/standardBox";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import { notFound } from "next/navigation";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { Games } from "./components/Games/Games";

type BoxPageProps = {
  params: Promise<{ boxName: string }>;
};

export async function StandardBoxPage({ params }: BoxPageProps) {
  const { boxName } = await params;

  // Obtém as informações sobre a caixa padrão correspondente ao parâmetro
  const standardBox = standardBoxes.find(
    (standardBox) => standardBox.box === boxName.toUpperCase(),
  );

  // Se não encontrar a caixa padrão, retorna 404
  if (!standardBox) {
    notFound();
  }

  // Obtém os dados da sessão do usuário
  const session = await auth();

  if (!session) {
    return null;
  }

  // Busca todos os jogos listados na caixa
  const games = await findAllStandardBoxByUserId({
    userId: +session.user.id,
    boxName: standardBox.box,
  });

  return (
    <section className="grid gap-10">
      <PageTitle
        title={standardBox.name}
        desc={
          <>
            Jogos listados na caixa{" "}
            <span className="font-bold">{standardBox.name}</span>.
          </>
        }
      />

      <Games games={games} />

      <DialogForm userId={+session.user.id} standardBox={standardBox} />
    </section>
  );
}
