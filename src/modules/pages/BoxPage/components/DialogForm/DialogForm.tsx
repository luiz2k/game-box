"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderTitle,
  DialogWrapping,
} from "@/modules/shared/components/Dialog/Dialog";
import { useDialogStore } from "../../stores/dialogStore";

// Componente controlado pelo Zustand
export function DialogForm() {
  const { game, dialogFormIsOpen, handleDialogForm } = useDialogStore();

  return (
    <>
      {dialogFormIsOpen && (
        <DialogWrapping close={handleDialogForm}>
          <DialogHeader>
            <DialogHeaderTitle className="text-left">
              {game.title}
            </DialogHeaderTitle>
          </DialogHeader>

          <DialogBody>
            Tem certeza que deseja remover o jogo{" "}
            <span className="font-bold">{game.title}</span> da caixa{" "}
            <span className="font-bold">Lorem ipsum</span>?
          </DialogBody>

          <DialogFooter>
            <Button
              variant="ghost"
              width="full"
              type="button"
              onClick={handleDialogForm}
            >
              Cancelar
            </Button>
            <Button variant="primary" width="full" type="submit">
              Confirmar
            </Button>
          </DialogFooter>
        </DialogWrapping>
      )}
    </>
  );
}
