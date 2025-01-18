import {
  GameCardBody,
  GameCardBodyAction,
  GameCardBodyHeader,
  GameCardBodyHeaderDesc,
  GameCardBodyHeaderTitle,
  GameCardImage,
  GameCardWarapping,
} from "@/modules/shared/components/GameCard/GameCard";
import {
  findAllGameListedInBox,
  findCustomBoxByUserId,
} from "@/modules/shared/lib/prisma/prisma";
import Link from "next/link";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { auth } from "@/auth";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";

type CustomBoxPageProps = {
  params: Promise<{
    box: string;
  }>;
};

export async function CustomBoxPage({ params }: CustomBoxPageProps) {
  const { box: boxId } = await params;

  const session = await auth();
  const userId = session?.user?.id;

  const customBox = await findCustomBoxByUserId(Number(boxId));

  const games = await findAllGameListedInBox(Number(boxId));

  return (
    <section className="grid gap-10">
      <div className="space-y-1">
        <h1 className="text-center text-4xl font-bold">{customBox?.name}</h1>
        <p className="text-center">
          Jogos listados da caixa{" "}
          <span className="font-bold">{customBox?.name}</span>.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] gap-4">
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

      <DialogForm customBox={customBox!} userId={Number(userId)} />
    </section>
  );
}
