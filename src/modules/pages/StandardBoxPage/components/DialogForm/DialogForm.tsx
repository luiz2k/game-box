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
import { useActionState, useEffect } from "react";
import { useDialogStore } from "../../stores/dialogStore";
import { removeGameToStandardBoxAction } from "./actions/removeGameToStandardBoxAction";

type HandleDialogRendering = {
  userId: number;
  standardBox: {
    box: Box;
    name: string;
  };
};

// Formulário para remover um jogo de uma caixa padrão
export function HandleDialogRendering({
  userId,
  standardBox,
}: DialogFormProps) {
  const { game, handleIsOpen } = useDialogStore();

  const [formState, formAction] = useActionState(
    async () =>
      await removeGameToStandardBoxAction({
        userId: userId,
        gameId: game.id,
        box: standardBox.box,
      }),
    null,
  );

  // Lida com o fechamento do formulário
  const handleDialogClosing = () => {
    // Se houver menssagem de erro, limpa
    if (formState?.messages.error) {
      formState.messages.error = "";
    }

    // Fecha o formulário
    handleIsOpen();
  };

  // Fecha o formulário ao receber um sucesso
  useEffect(() => {
    if (formState?.messages.success) {
      handleIsOpen();
    }
  }, [formState?.messages.success, handleIsOpen]);

  return (
    <DialogWrapping close={handleDialogClosing} action={formAction}>
      <DialogHeader>
        <DialogHeaderTitle className="text-left">
          {game.title}
        </DialogHeaderTitle>
        {formState?.messages.error && (
          <DialogHeaderDesc className="text-left">
            <p className="text-red-600">{formState.messages.error}</p>
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
          onClick={handleDialogClosing}
        >
          Cancelar
        </Button>

        <Button variant="primary" width="full" type="submit">
          Confirmar
        </Button>
      </DialogFooter>
    </DialogWrapping>
  );
}

type DialogFormProps = {
  userId: number;
  standardBox: {
    box: Box;
    name: string;
  };
};

// Formulário para remover um jogo de uma caixa padrão
export function DialogForm({ userId, standardBox }: DialogFormProps) {
  const { isOpen } = useDialogStore();

  return (
    <>
      {isOpen && (
        <HandleDialogRendering userId={userId} standardBox={standardBox} />
      )}
    </>
  );
}
