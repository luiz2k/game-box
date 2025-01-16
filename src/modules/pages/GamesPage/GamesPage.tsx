import {
  GameCardBody,
  GameCardBodyHeader,
  GameCardBodyHeaderDesc,
  GameCardBodyHeaderTitle,
  GameCardImage,
  GameCardWarapping,
} from "@/modules/shared/components/GameCard/GameCard";

import gameData from "@/seeds/data.json";
import Link from "next/link";

export function GamesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const games: any[] = gameData;

  return (
    <section className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-center text-4xl font-bold">Jogos</h1>
        <p className="text-center">Jogos disponíveis</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] gap-4">
        {games.map((game) => (
          <Link key={game.id} title={game.title} href={`/jogos/${game.id}`}>
            <GameCardWarapping>
              <GameCardImage
                id={game.id}
                imgSrc={game.cover}
                alt={game.title}
              />

              <GameCardBody>
                <GameCardBodyHeader>
                  <GameCardBodyHeaderTitle title={game.title} />
                  <GameCardBodyHeaderDesc>
                    <p>{game.genre.join(", ")}</p>
                    <p>
                      {new Date(game.release_date).toLocaleDateString("pt-BR")}
                    </p>
                  </GameCardBodyHeaderDesc>
                </GameCardBodyHeader>
              </GameCardBody>
            </GameCardWarapping>
          </Link>
        ))}
      </div>
    </section>
  );
}
