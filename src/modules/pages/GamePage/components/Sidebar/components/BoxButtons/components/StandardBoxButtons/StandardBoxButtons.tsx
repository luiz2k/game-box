import { auth } from "@/auth";
import { Button } from "@/modules/shared/components/Button/Button";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/prisma";
import { Box } from "@prisma/client";
import { Minus, Plus } from "lucide-react";

import { revalidatePath } from "next/cache";
import { removeGameToStandardBoxAction } from "./actions/removeGameToStandardBoxAction";
import { addGameToStandardBoxAction } from "./actions/addGameToStandardBoxAction";

type StandardBoxButtonsProps = {
  gameId: number;
};

export async function StandardBoxButtons({ gameId }: StandardBoxButtonsProps) {
  // Obtem o ID do usuário através da sua sessão
  const session = await auth();
  const userId = Number(session?.user?.id);

  // Busca em qual caixa padrão o jogo foi adicionado
  const standardBoxes = await findAllStandardBoxByUserId({
    userId: Number(session?.user?.id),
    gameId: gameId,
  });

  // Informações adicionais sobre as caixas padrão
  const boxes = [
    {
      box: Box.FAVORITE,
      name: "Favorito",
      constains: false,
    },
    {
      box: Box.PLAYING,
      name: "Jogado",
      constains: false,
    },
    {
      box: Box.ABANDONED,
      name: "Abandonado",

      constains: false,
    },
    {
      box: Box.FINISHED,
      name: "Finalizado",
      constains: false,
    },
  ];

  // Verifica se o jogo já foi adicionado nas caixas padrão
  boxes.forEach((box) => {
    standardBoxes.forEach((standardBox) => {
      if (box.box === standardBox.box) {
        box.constains = true;
      }
    });
  });

  return (
    <div className="space-y-2">
      <h2 className="font-bold">Caixas padrão</h2>

      <ul className="scroll max-h-[13.5rem] space-y-2 overflow-y-auto pr-2">
        {boxes.map((box) => (
          <li key={box.box}>
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
                  await removeGameToStandardBoxAction({
                    userId: userId,
                    gameId: gameId,
                    box: box.box,
                  });
                } else {
                  // Adiciona o jogo na caixa
                  await addGameToStandardBoxAction({
                    userId: userId,
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
