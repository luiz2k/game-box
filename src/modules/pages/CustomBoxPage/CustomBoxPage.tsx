import { auth } from "@/auth";
import {
  GameCardBody,
  GameCardBodyAction,
  GameCardBodyHeader,
  GameCardBodyHeaderDesc,
  GameCardBodyHeaderTitle,
  GameCardImage,
  GameCardWarapping,
} from "@/modules/shared/components/GameCard/GameCard";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { findCustomBoxByUserId } from "@/modules/shared/lib/prisma/customBox";
import { findAllListedGameByUserId } from "@/modules/shared/lib/prisma/listedGame";
import { gameColumnStyle } from "@/modules/shared/utils/gameColumnStyle";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";

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

  const columnStyles = gameColumnStyle(games.length);

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

      {games.length > 0 ? (
        <div className={columnStyles}>
          {games.map((game) => (
            <Link
              key={game.Game.id}
              title={game.Game.title}
              href={`/jogos/${game.Game.id}`}
            >
              <GameCardWarapping>
                <GameCardImage imgSrc={game.Game.cover} alt={game.Game.title} />

                <GameCardBody>
                  <GameCardBodyHeader>
                    <GameCardBodyHeaderTitle title={game.Game.title} />
                    <GameCardBodyHeaderDesc>
                      <p>{game.Game.genre.join(", ")}</p>
                      <p>
                        {/* Faz a formatação da data para pt-BR. EX: 01 de janeiro de 2022 */}
                        {new Date(game.Game.release_date).toLocaleDateString(
                          "pt-BR",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </p>
                    </GameCardBodyHeaderDesc>
                  </GameCardBodyHeader>
                  <GameCardBodyAction>
                    <GameCardCustomAction
                      title={game.Game.title}
                      gameId={game.Game.id}
                    />
                  </GameCardBodyAction>
                </GameCardBody>
              </GameCardWarapping>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center">Nenhum jogo foi listado nesta caixa.</p>
        </div>
      )}

      <DialogForm customBox={customBox} userId={+session.user.id} />
    </section>
  );
}
