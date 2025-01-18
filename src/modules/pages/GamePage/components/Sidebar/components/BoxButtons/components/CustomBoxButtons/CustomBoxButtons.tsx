import { auth } from "@/auth";
import { Button } from "@/modules/shared/components/Button/Button";
import {
  findAllCustomBoxByUserId,
  findAllListedGameByUserId,
} from "@/modules/shared/lib/prisma/prisma";
import { Minus, Plus } from "lucide-react";
import { removeGameToCustomBoxAction } from "./actions/removeGameToCustomBoxAction";
import { revalidatePath } from "next/cache";
import { addGameToCustomBoxAction } from "./actions/addGameToCustomBoxAction";

type CustomBoxButtonsProps = {
  gameId: number;
};

export async function CustomBoxButtons({ gameId }: CustomBoxButtonsProps) {
  // Obtem o ID do usuário através da sua sessão
  const session = await auth();
  const userId = Number(session?.user?.id);

  // Obtem as caixas customizadas do usuário
  const customBoxes = await findAllCustomBoxByUserId(userId);

  // Obtem as caixas onde o jogo foi listado
  const listedGames = await findAllListedGameByUserId({
    userId,
    gameId: Number(gameId),
  });

  // Verifica em quais caixa o jogo foi listado
  const theGameIsListed = customBoxes.map((box) => {
    // Verifica se o jogo está listado na caixa
    const gameIsListed = listedGames.some(
      (listedGame) => listedGame.customBoxId === box.id,
    );

    return {
      constains: gameIsListed,
      ...box,
    };
  });

  return (
    <div className="space-y-2">
      <h2 className="font-bold">Suas caixas</h2>

      <ul className="scroll max-h-40 space-y-2 overflow-y-auto pr-2">
        {theGameIsListed.map((box) => (
          <li key={box.id}>
            <Button
              type="button"
              variant={box.constains ? "ghost" : "primary"}
              width="full"
              rightIcon={box.constains ? Minus : Plus}
              space="between"
              onClick={async () => {
                "use server";

                if (box.constains) {
                  // Remove o jogo da caixa
                  await removeGameToCustomBoxAction({
                    userId: userId,
                    gameId: gameId,
                    customBoxId: box.id,
                  });
                } else {
                  // Adiciona o jogo na caixa
                  await addGameToCustomBoxAction({
                    userId: userId,
                    gameId: gameId,
                    customBoxId: box.id,
                  });
                }

                // Revalida a página
                revalidatePath(`/jogos/${gameId}`);
              }}
            >
              {box.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
