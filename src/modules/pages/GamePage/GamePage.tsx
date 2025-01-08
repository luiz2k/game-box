import { Button } from "@/modules/shared/components/Button/Button";
import Image from "next/image";

import gameData from "@/seeds/data.json";
import { notFound } from "next/navigation";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function GamePage({ params }: GamePageProps) {
  const { id } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const games: any[] = gameData;

  const game = games.find((game) => game.id === Number(id));

  if (!game) {
    return notFound();
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[18.75rem,1fr]">
        <div className="space-y-4">
          <Image
            src={game.cover}
            alt={game.title}
            width={460}
            height={215}
            priority={true}
            loading="eager"
            className="w-full rounded-2xl"
          />

          <ul className="space-y-1 rounded-2xl bg-black-2 p-4 text-sm">
            <li>
              <span className="font-bold">Lançamento:</span>{" "}
              {new Date(game.release_date).toLocaleDateString("pt-BR")}
            </li>
            <li>
              <span className="font-bold">Genero:</span> {game.genre.join(", ")}
            </li>
            <li>
              <span className="font-bold">Desenvolvedor:</span>{" "}
              {game.developer.join(", ")}
            </li>
            <li>
              <span className="font-bold">Destribuidor:</span>{" "}
              {game.distributor.join(", ")}
            </li>
          </ul>
        </div>

        <div className="space-y-1 rounded-2xl bg-black-2 p-4">
          <h1 className="text-2xl font-bold">{game.title}</h1>

          <p className="scroll overflow-y-auto text-sm">{game.summary}</p>
        </div>
      </div>

      <div className="ml-auto w-fit">
        <Button width="fit" variant="primary">
          Adicionar / Remover
        </Button>
      </div>
    </section>
  );
}
