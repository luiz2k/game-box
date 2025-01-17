"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderDesc,
  DialogHeaderTitle,
  DialogWrapping,
} from "@/modules/shared/components/Dialog/Dialog";
import { Box } from "@prisma/client";
import { useDialogStore } from "../../stores/dialogStore";
import { removeGameToStandardBoxAction } from "./actions/removeGameToStandardBoxAction";
import { useState } from "react";

type DialogFormProps = {
  userId: number;
  standardBox: {
    box: Box;
    name: string;
  };
};

// Formulário para remover um jogo de uma caixa padrão
export function DialogForm({ userId, standardBox }: DialogFormProps) {
  const { game, dialogFormIsOpen, handleDialogForm } = useDialogStore();

  const [errorMessage, setErrorMessage] = useState<string>("");

  // Lida com o submit do formulário
  const handleSubmit = async () => {
    // Remove o jogo da caixa
    const res = await removeGameToStandardBoxAction({
      userId: userId,
      gameId: game.id,
      box: standardBox.box,
    });

    // Se houver erro, mostra o erro
    if (res?.messages.error) {
      setErrorMessage(res.messages.error);
    }

    // Fecha o formulário
    handleDialogForm();
  };

  // Lida com o fechamento do formulário
  const handleCloseForm = () => {
    // Fecha o formulário
    handleDialogForm();

    // Limpa o erro se houver
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  return (
    <>
      {dialogFormIsOpen && (
        <DialogWrapping close={handleDialogForm} action={handleSubmit}>
          <DialogHeader>
            <DialogHeaderTitle className="text-left">
              {game.title}
            </DialogHeaderTitle>
            {errorMessage && (
              <DialogHeaderDesc className="text-left">
                <p className="text-red-600">{errorMessage}</p>
              </DialogHeaderDesc>
            )}
          </DialogHeader>

          <DialogBody>
            Tem certeza que deseja remover o jogo{" "}
            <span className="font-bold">{game.title}</span> da caixa{" "}
            <span className="font-bold">{standardBox.name}</span>?
          </DialogBody>

          <DialogFooter>
            <Button
              variant="ghost"
              width="full"
              type="button"
              onClick={handleCloseForm}
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
