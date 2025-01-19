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
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";
import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";

type BoxPageProps = {
  params: Promise<{ box: string }>;
};

export async function BoxPage({ params }: BoxPageProps) {
  const { box } = await params;

  // Obtém as informações sobre a caixa padrão correspondente ao parâmetro
  const standardBox = standardBoxes.find(
    (standardBox) => standardBox.box === box.toUpperCase(),
  );

  // Se não encontrar a caixa padrão, retorna 404
  if (!standardBox) {
    notFound();
  }

  // Ontém o ID do usuário através da sessão
  const session = await auth();
  const userId = session?.user?.id;

  // Busca todos os jogos listados na caixa
  const games = await findAllStandardBoxByUserId({
    userId: Number(userId),
    box: standardBox.box,
  });

  return (
    <section className="grid gap-10">
      <PageTitle
        title={standardBox.name}
        desc={
          <>
            Jogos listados na caixa{" "}
            <span className="font-bold">{standardBox.name}</span>
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

      <DialogForm userId={Number(userId)} standardBox={standardBox} />
    </section>
  );
}
