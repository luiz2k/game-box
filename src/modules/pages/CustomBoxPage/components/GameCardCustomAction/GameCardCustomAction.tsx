"use client";

import { GameCardBodyActionButton } from "@/modules/shared/components/GameCard/GameCard";
import { Trash2 } from "lucide-react";
import { useDialogStore } from "../../stores/dialogStore";

type GameCardCustomActionProps = {
  title: string;
  gameId: number;
};
export function GameCardCustomAction({
  title,
  gameId,
}: GameCardCustomActionProps) {
  const { setGame, handleDialogForm } = useDialogStore();

  return (
    <GameCardBodyActionButton
      onClick={(event) => {
        event.preventDefault();

        setGame({ id: gameId, title: title });
        handleDialogForm();
      }}
    >
      <Trash2 />
    </GameCardBodyActionButton>
  );
}
