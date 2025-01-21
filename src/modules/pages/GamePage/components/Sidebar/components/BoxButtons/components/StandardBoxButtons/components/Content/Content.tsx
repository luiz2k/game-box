"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import { Box } from "@prisma/client";
import { SquarePlus, Trash2 } from "lucide-react";
import { removeGameToStandardBoxAction } from "./actions/removeGameToStandardBoxAction";
import { addGameToStandardBoxAction } from "./actions/addGameToStandardBoxAction";
import { useState } from "react";

type ButtonsProps = {
  userId: number;
  gameId: number;
  listedBoxes: {
    contains: boolean;
    box: Box;
    name: string;
  }[];
};

export function Content({ userId, gameId, listedBoxes }: ButtonsProps) {
  const [errorMenssage, setErrorMenssage] = useState<string>("");

  // Adiciona ou remove o jogo da caixa
  const handleOnClick = async (box: Box, contains: boolean) => {
    if (contains) {
      // Remove o jogo da caixa
      const response = await removeGameToStandardBoxAction({
        userId: userId,
        gameId: gameId,
        box: box,
      });

      // Se houver error, exibe a mensagem
      if (response?.menssages.error) {
        setErrorMenssage(response.menssages.error);
      }

      return;
    }

    // Adiciona o jogo na caixa
    const response = await addGameToStandardBoxAction({
      userId: userId,
      gameId: gameId,
      box: box,
    });

    if (response?.menssages.error) {
      setErrorMenssage(response.menssages.error);
    }
  };
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h2 className="font-bold">Caixas padrão</h2>
        {errorMenssage && (
          <p className="text-sm text-red-600">{errorMenssage}</p>
        )}
      </div>

      <ul className="scroll max-h-[13.5rem] space-y-2 overflow-y-auto pr-2">
        {listedBoxes.map((box) => (
          <li key={box.box}>
            <Button
              type="button"
              variant={box.contains ? "ghost" : "primary"}
              width="full"
              rightIcon={box.contains ? Trash2 : SquarePlus}
              space="between"
              onClick={async () => handleOnClick(box.box, box.contains)}
            >
              {box.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
