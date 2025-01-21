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
import { authSession } from "@/modules/shared/utils/session";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/standardBox";

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
  const session = await authSession();

  // Busca todos os jogos listados na caixa
  const games = await findAllStandardBoxByUserId({
    userId: session.id,
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

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] gap-4">
        {games.length > 0 ? (
          <>
            {games.map((game) => (
              <Link
                key={game.Game.id}
                title={game.Game.title}
                href={`/jogos/${game.Game.id}`}
              >
                <GameCardWarapping>
                  <GameCardImage
                    imgSrc={game.Game.cover}
                    alt={game.Game.title}
                  />

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
          </>
        ) : (
          <p className="text-center">Nenhum jogo foi listado nesta caixa.</p>
        )}
      </div>

      <DialogForm userId={session.id} standardBox={standardBox} />
    </section>
  );
}
