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
import { useState } from "react";
import { useDeleteCustomBoxDialogStore } from "../../../stores/deleteCustomBoxStore";
import { deleteCustomBoxAction } from "./actions/deleteCustomBoxAction";

type DialogFormProps = {
  userId: number;
};

// Formulário para remover um jogo de uma caixa padrão
export function DeleteCustomBoxDialog({ userId }: DialogFormProps) {
  const { box, dialogFormIsOpen, handleDialogForm } =
    useDeleteCustomBoxDialogStore();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Apaga a caixa customizada
    const res = await deleteCustomBoxAction({
      boxId: box.id,
      userId: userId,
    });

    // Se houver erro, mostra o erro
    if (res?.messages.error) {
      setErrorMessage(res.messages.error);
    }

    // Fecha o formulário
    handleDialogForm();
  };

  return (
    <>
      {dialogFormIsOpen && (
        <DialogWrapping close={handleDialogForm} onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogHeaderTitle className="text-left">
              {box.name}
            </DialogHeaderTitle>
            {errorMessage && (
              <DialogHeaderDesc className="text-left">
                <p className="text-red-600">{errorMessage}</p>
              </DialogHeaderDesc>
            )}
          </DialogHeader>

          <DialogBody>
            Tem certeza que deseja remover a caixa{" "}
            <span className="font-bold">{box.name}?</span>
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
