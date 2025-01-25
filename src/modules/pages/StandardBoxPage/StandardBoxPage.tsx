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
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/standardBox";
import { gameColumnStyle } from "@/modules/shared/utils/gameColumnStyle";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";

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

  const columnStyles = gameColumnStyle(games.length);

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

      <DialogForm userId={+session.user.id} standardBox={standardBox} />
    </section>
  );
}
