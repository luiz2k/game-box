import {
  GameCardBody,
  GameCardBodyAction,
  GameCardBodyHeader,
  GameCardBodyHeaderDesc,
  GameCardBodyHeaderTitle,
  GameCardImage,
  GameCardWarapping,
} from "@/modules/shared/components/GameCard/GameCard";
import gameData from "@/seeds/data.json";
import Link from "next/link";
import { DialogForm } from "./components/DialogForm/DialogForm";
import { GameCardCustomAction } from "./components/GameCardCustomAction/GameCardCustomAction";

type BoxPageProps = {
  params: Promise<{ id: string }>;
};

export async function BoxPage({ params }: BoxPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const games: any[] = gameData;

  return (
    <section className="grid gap-10">
      <div className="space-y-1">
        <h1 className="text-center text-4xl font-bold">Jogos</h1>
        <p className="text-center">
          Jogos dentro da caixa <span className="font-bold">Exemplo</span>.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] gap-4">
        {games.slice(0, 5).map((game) => (
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
                    <p>{game.genres.join(", ")}</p>
                    <p>
                      {/* Faz a formatação da data para pt-BR */}
                      {new Date(game.release_date).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </GameCardBodyHeaderDesc>
                </GameCardBodyHeader>
                <GameCardBodyAction>
                  <GameCardCustomAction title={game.title} />
                </GameCardBodyAction>
              </GameCardBody>
            </GameCardWarapping>
          </Link>
        ))}
      </div>

      <DialogForm />
    </section>
  );
}
