import { gameColumnStyle } from "@/modules/shared/utils/gameColumnStyle";
import Link from "next/link";
import { GameCard } from "./components/GameCard/GameCard";

type GamesProps = {
  games: {
    Game: {
      id: number;
      title: string;
      cover: string;
      genre: string[];
      release_date: Date;
      summary: string;
      developer: string[];
      distributor: string[];
    };
  }[];
};

export function Games({ games }: GamesProps) {
  const columnStyles = gameColumnStyle(games.length);

  return (
    <>
      {games.length > 0 ? (
        <div className={columnStyles}>
          {games.map((game) => (
            <Link
              key={game.Game.id}
              title={game.Game.title}
              href={`/jogos/${game.Game.id}`}
            >
              <GameCard game={game} />
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-center">Nenhum jogo foi listado nesta caixa.</p>
        </div>
      )}
    </>
  );
}
