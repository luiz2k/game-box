"use client";

import { useDialogStore } from "@/modules/pages/CustomBoxPage/stores/dialogStore";
import { GameCardBodyActionButton } from "@/modules/shared/components/GameCard/GameCard";
import { Trash2 } from "lucide-react";

type GameCardCustomActionProps = {
  title: string;
  gameId: number;
};
export function GameCardCustomAction({
  title,
  gameId,
}: GameCardCustomActionProps) {
  const { setGame, handleIsOpen } = useDialogStore();

  return (
    <GameCardBodyActionButton
      onClick={(event) => {
        event.preventDefault();

        setGame({ id: gameId, title: title });
        handleIsOpen();
      }}
    >
      <Trash2 />
    </GameCardBodyActionButton>
  );
}
