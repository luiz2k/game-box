"use client";

import { BoxCardHeaderAction } from "@/modules/pages/ProfilePage/components/BoxCard/BoxCard";
import { Trash2 } from "lucide-react";
import { useDeleteBoxStore } from "../DeleteBox/stores/deleteBoxStore";

type BoxCardHeaderActionCustomProps = {
  id: number;
  name: string;
};

export function BoxCardHeaderActionCustom({
  id,
  name,
}: BoxCardHeaderActionCustomProps) {
  const { handleIsOpen, setBox } = useDeleteBoxStore();

  // Abre o formulário de exclusão de jogo
  const handleBoxCardAction = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    // Define os dados do jogo que será excluído
    setBox({ id: id, name: name });

    // Abre o formulário
    handleIsOpen();
  };

  return (
    <BoxCardHeaderAction type="button" onClick={handleBoxCardAction}>
      <Trash2 />
    </BoxCardHeaderAction>
  );
}
