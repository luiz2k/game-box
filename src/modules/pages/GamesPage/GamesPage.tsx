import { GameCard } from "@/modules/shared/components/GameCard/GameCard";

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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {games.map((game) => (
          <Link key={game.id} title={game.title} href={`/jogos/${game.id}`}>
            <GameCard
              id={game.id}
              title={game.title}
              imgSrc={game.cover}
              alt={game.title}
              genres={game.genre}
              release_date={game.release_date}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
