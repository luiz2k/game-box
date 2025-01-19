import { Button } from "@/modules/shared/components/Button/Button";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/prisma";
import { SquarePlus, Trash2 } from "lucide-react";

import { authSession } from "@/modules/shared/utils/session";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import { revalidatePath } from "next/cache";
import { addGameToStandardBoxAction } from "./actions/addGameToStandardBoxAction";
import { removeGameToStandardBoxAction } from "./actions/removeGameToStandardBoxAction";

type StandardBoxButtonsProps = {
  gameId: number;
};

export async function StandardBoxButtons({ gameId }: StandardBoxButtonsProps) {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  // Busca as caixas padrão onde o jogo foi listado
  const gamesInTheBox = await findAllStandardBoxByUserId({
    userId: session.id,
    gameId: gameId,
  });

  // Obtém todas as caixas padrão disponíveis
  const boxes = standardBoxes;

  // Lista em quais caixas o jogo foi listado
  const listedInTheBox = boxes.map((box) => {
    // Verifica se o jogo foi listado na caixa
    const contains = gamesInTheBox.some((list) => list.box === box.box);

    // Marca o jogo como listado
    if (contains) {
      return {
        ...box,
        contains,
      };
    }

    // Marca o jogo como não listado
    return {
      ...box,
      contains,
    };
  });

  return (
    <div className="space-y-2">
      <h2 className="font-bold">Caixas padrão</h2>

      <ul className="scroll max-h-[13.5rem] space-y-2 overflow-y-auto pr-2">
        {listedInTheBox.map((box) => (
          <li key={box.box}>
            <Button
              type="button"
              variant={box.contains ? "ghost" : "primary"}
              width="full"
              rightIcon={box.contains ? Trash2 : SquarePlus}
              space="between"
              onClick={async () => {
                "use server";

                if (box.contains) {
                  // Remove o jogo da caixa
                  await removeGameToStandardBoxAction({
                    userId: session.id,
                    gameId: gameId,
                    box: box.box,
                  });
                } else {
                  // Adiciona o jogo na caixa
                  await addGameToStandardBoxAction({
                    userId: session.id,
                    gameId: gameId,
                    box: box.box,
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
