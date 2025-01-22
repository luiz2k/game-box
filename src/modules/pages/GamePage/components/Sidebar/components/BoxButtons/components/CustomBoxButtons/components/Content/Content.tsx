"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import { SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { addGameToCustomBoxAction } from "./actions/addGameToCustomBoxAction";
import { removeGameToCustomBoxAction } from "./actions/removeGameToCustomBoxAction";

type ContentProps = {
  userId: number;
  gameId: number;
  listedBoxes: {
    userId: number;
    id: number;
    name: string;
    constains: boolean;
  }[];
};
export function Content({ userId, gameId, listedBoxes }: ContentProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleOnClick = async (
    boxId: number,
    gameId: number,
    constains: boolean,
  ) => {
    if (constains) {
      // Remove o jogo da caixa
      const response = await removeGameToCustomBoxAction({
        userId: userId,
        gameId: gameId,
        customBoxId: boxId,
      });

      if (response?.messages.error) {
        setErrorMessage(response.messages.error);
      }

      return;
    }

    // Adiciona o jogo na caixa
    const response = await addGameToCustomBoxAction({
      userId: userId,
      gameId: gameId,
      customBoxId: boxId,
    });

    if (response?.messages.error) {
      setErrorMessage(response.messages.error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h2 className="font-bold">Suas caixas</h2>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>

      <ul className="scroll max-h-[13.5rem] space-y-2 overflow-y-auto pr-2">
        {listedBoxes.map((box) => (
          <li key={box.id}>
            <Button
              type="button"
              variant={box.constains ? "ghost" : "primary"}
              width="full"
              rightIcon={box.constains ? Trash2 : SquarePlus}
              space="between"
              onClick={() => handleOnClick(box.id, gameId, box.constains)}
            >
              {box.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
