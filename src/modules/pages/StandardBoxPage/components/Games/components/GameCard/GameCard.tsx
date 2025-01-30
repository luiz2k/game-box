import {
  GameCardWarapping,
  GameCardImage,
  GameCardBody,
  GameCardBodyHeader,
  GameCardBodyHeaderTitle,
  GameCardBodyHeaderDesc,
  GameCardBodyAction,
} from "@/modules/shared/components/GameCard/GameCard";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";

type GameCardProps = {
  game: {
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
  };
};

export function GameCard({ game }: GameCardProps) {
  return (
    <GameCardWarapping>
      <GameCardImage imgSrc={game.Game.cover} alt={game.Game.title} />

      <GameCardBody>
        <GameCardBodyHeader>
          <GameCardBodyHeaderTitle title={game.Game.title} />
          <GameCardBodyHeaderDesc>
            <p>{game.Game.genre.join(", ")}</p>
            <p>
              {/* Faz a formatação da data para pt-BR. EX: 01 de janeiro de 2022 */}
              {new Date(game.Game.release_date).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </GameCardBodyHeaderDesc>
        </GameCardBodyHeader>
        <GameCardBodyAction>
          <GameCardCustomAction title={game.Game.title} gameId={game.Game.id} />
        </GameCardBodyAction>
      </GameCardBody>
    </GameCardWarapping>
  );
}
