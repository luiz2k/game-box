import { auth } from "@/auth";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { findCustomBoxByUserId } from "@/modules/shared/lib/prisma/customBox";
import { findAllListedGameByUserId } from "@/modules/shared/lib/prisma/listedGame";
import { notFound } from "next/navigation";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { Games } from "./components/Games/Games";

type CustomBoxPageProps = {
  params: Promise<{
    boxId: string;
  }>;
};

export async function CustomBoxPage({ params }: CustomBoxPageProps) {
  const { boxId } = await params;

  // Se o ID for NaN, retorna 404
  if (isNaN(+boxId)) {
    return notFound();
  }

  // Obtém os dados da sessão do usuário
  const session = await auth();

  if (!session) {
    return null;
  }

  // Busca informações sobre a caixa
  const customBox = await findCustomBoxByUserId({
    boxId: +boxId,
    userId: +session.user.id,
  });

  // Se não encontrar a caixa, retorna 404
  if (!customBox) {
    notFound();
  }

  // Busca todos os jogos listados na caixa
  const games = await findAllListedGameByUserId({
    userId: +session.user.id,
    boxId: +boxId,
  });

  return (
    <section className="grid gap-10">
      <PageTitle
        title={customBox?.name}
        desc={
          <>
            Jogos listados na caixa{" "}
            <span className="font-bold">{customBox?.name}</span>.
          </>
        }
      />

      <Games games={games} />

      <DialogForm customBox={customBox} userId={+session.user.id} />
    </section>
  );
}
