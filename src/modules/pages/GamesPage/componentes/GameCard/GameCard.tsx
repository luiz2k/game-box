import {
  GameCardBody,
  GameCardBodyHeader,
  GameCardBodyHeaderDesc,
  GameCardBodyHeaderTitle,
  GameCardImage,
  GameCardWarapping,
} from "@/modules/shared/components/GameCard/GameCard";

type GameCardProps = {
  game: {
    cover: string;
    title: string;
    genre: string[];
    release_date: Date;
    summary: string;
    id: number;
    developer: string[];
    distributor: string[];
  };
};

export function GameCard({ game }: GameCardProps) {
  return (
    <GameCardWarapping>
      <GameCardImage imgSrc={game.cover} alt={game.title} />

      <GameCardBody>
        <GameCardBodyHeader>
          <GameCardBodyHeaderTitle title={game.title} />
          <GameCardBodyHeaderDesc>
            <p>{game.genre.join(", ")}</p>
            <p>{new Date(game.release_date).toLocaleDateString("pt-BR")}</p>
          </GameCardBodyHeaderDesc>
        </GameCardBodyHeader>
      </GameCardBody>
    </GameCardWarapping>
  );
}
