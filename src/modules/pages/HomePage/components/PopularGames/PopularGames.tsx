import {
  GameCardBody,
  GameCardBodyHeader,
  GameCardBodyHeaderDesc,
  GameCardBodyHeaderTitle,
  GameCardImage,
  GameCardWarapping,
} from "@/modules/shared/components/GameCard/GameCard";
import { findAllGames } from "@/modules/shared/lib/prisma/prisma";
import Link from "next/link";

export async function PopularGames() {
  const games = await findAllGames();

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-bold">Jogos populares</h2>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] gap-4">
        {games.slice(0, 6).map((game) => (
          <Link key={game.id} title={game.title} href={`/jogos/${game.id}`}>
            <GameCardWarapping>
              <GameCardImage imgSrc={game.cover} alt={game.title} />

              <GameCardBody>
                <GameCardBodyHeader>
                  <GameCardBodyHeaderTitle title={game.title} />
                  <GameCardBodyHeaderDesc>
                    <p>{game.genre.join(", ")}</p>
                    <p>
                      {/* Faz a formatação da data para pt-BR. EX: 01 de janeiro de 2022 */}
                      {new Date(game.release_date).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
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
