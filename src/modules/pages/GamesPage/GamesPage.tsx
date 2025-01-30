import { PageTitle } from "@/modules/shared/components/PageTitle/PageTitle";
import { findAllGames } from "@/modules/shared/lib/prisma/game";
import Link from "next/link";
import { GameCard } from "./componentes/GameCard/GameCard";

export async function GamesPage() {
  const games = await findAllGames();

  return (
    <section className="space-y-10">
      <PageTitle title="Jogos" desc="Todos os jogos listados na plataforma." />

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] gap-4">
        {games.map((game) => (
          <Link key={game.id} title={game.title} href={`/jogos/${game.id}`}>
            <GameCard game={game} />
          </Link>
        ))}
      </div>
    </section>
  );
}
