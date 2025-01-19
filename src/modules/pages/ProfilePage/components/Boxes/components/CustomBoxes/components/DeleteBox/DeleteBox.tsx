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
import { useActionState, useEffect } from "react";
import { useDeleteBoxStore } from "./stores/deleteBoxStore";
import { deleteBoxAction } from "./actions/deleteBoxAction";

type HandleDialogRenderingProps = {
  userId: number;
};

// Formulário para apagar uma caixa
function HandleDialogRendering({ userId }: HandleDialogRenderingProps) {
  // Lida com a visualização do formulário
  const { box, setIsOpen } = useDeleteBoxStore();

  // Lida com o submit do formulário
  const [formState, formAction] = useActionState(
    async () => await deleteBoxAction({ boxId: box.id, userId }),
    null,
  );

  // Quando remover a caixa com sucesso, fecha o formulário
  useEffect(() => {
    if (formState?.messages.success) {
      setIsOpen();
    }
  }, [formState?.messages.success, setIsOpen]);

  return (
    <>
      <DialogWrapping close={setIsOpen} action={formAction}>
        <DialogHeader>
          <DialogHeaderTitle className="text-left">
            {box.name}
          </DialogHeaderTitle>
          {formState?.messages.error && (
            <DialogHeaderDesc className="text-left">
              <p className="text-red-600">{formState?.messages.error}</p>
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
            onClick={setIsOpen}
          >
            Cancelar
          </Button>

          <Button variant="primary" width="full" type="submit">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogWrapping>
    </>
  );
}

type DialogFormProps = {
  userId: number;
};

export function DeleteBox({ userId }: DialogFormProps) {
  // Lida com a visualização do formulário
  const { isOpen } = useDeleteBoxStore();

  return <>{isOpen && <HandleDialogRendering userId={userId} />}</>;
}
