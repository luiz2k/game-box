import { Button } from "@/modules/shared/components/Button/Button";
import {
  findAllCustomBoxByUserId,
  findAllListedGameByUserId,
} from "@/modules/shared/lib/prisma/prisma";
import { authSession } from "@/modules/shared/utils/session";
import { SquarePlus, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { addGameToCustomBoxAction } from "./actions/addGameToCustomBoxAction";
import { removeGameToCustomBoxAction } from "./actions/removeGameToCustomBoxAction";

type CustomBoxButtonsProps = {
  gameId: number;
};

export async function CustomBoxButtons({ gameId }: CustomBoxButtonsProps) {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  // Obtem as caixas customizadas do usuário
  const customBoxes = await findAllCustomBoxByUserId(session.id);

  // Obtem as caixas onde o jogo foi listado
  const listedGames = await findAllListedGameByUserId({
    userId: session.id,
    gameId: gameId,
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

      <ul className="scroll max-h-[13.5rem] space-y-2 overflow-y-auto pr-2">
        {theGameIsListed.map((box) => (
          <li key={box.id}>
            <Button
              type="button"
              variant={box.constains ? "ghost" : "primary"}
              width="full"
              rightIcon={box.constains ? Trash2 : SquarePlus}
              space="between"
              onClick={async () => {
                "use server";

                if (box.constains) {
                  // Remove o jogo da caixa
                  await removeGameToCustomBoxAction({
                    userId: session.id,
                    gameId: gameId,
                    customBoxId: box.id,
                  });
                } else {
                  // Adiciona o jogo na caixa
                  await addGameToCustomBoxAction({
                    userId: session.id,
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
