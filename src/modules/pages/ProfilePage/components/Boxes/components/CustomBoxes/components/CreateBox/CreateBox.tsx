"use client";

import {
  BoxCardHeader,
  BoxCardHeaderContent,
  BoxCardTitle,
  BoxCardWrapper,
} from "@/modules/pages/ProfilePage/components/BoxCard/BoxCard";
import { Button } from "@/modules/shared/components/Button/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderDesc,
  DialogHeaderTitle,
  DialogWrapping,
} from "@/modules/shared/components/Dialog/Dialog";
import { FormInput } from "@/modules/shared/components/Input/Input";
import { Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { createBoxAction } from "./actions/createBoxAction";

type HandleDialogRenderingProps = {
  userId: string;
  onClose: () => void;
};

// Formulário para criar uma caixa
function HandleDialogRendering({
  userId,
  onClose,
}: HandleDialogRenderingProps) {
  // Lida com o submit do formulário
  const [formState, formAction] = useActionState(
    async (_prev: unknown, formData: FormData) =>
      await createBoxAction({ formData, userId }),
    null,
  );

  // Quando criar a caixa com sucesso, fecha o formulário
  useEffect(() => {
    if (formState?.messages.success) {
      onClose();
    }
  }, [formState?.messages.success, onClose]);

  return (
    <>
      <DialogWrapping close={onClose} action={formAction}>
        <DialogHeader>
          <DialogHeaderTitle className="text-left">
            Criando uma nova caixa
          </DialogHeaderTitle>
          {formState?.messages.error && (
            <DialogHeaderDesc className="text-left">
              <p className="text-red-600">{formState?.messages.error}</p>
            </DialogHeaderDesc>
          )}
        </DialogHeader>

        <DialogBody>
          <FormInput
            width="full"
            name="name"
            label="Nome da caixa"
            error={formState?.inputErrors?.name?.toString() || ""}
            defaultValue={formState?.inputValues?.name.toString() || ""}
          />
        </DialogBody>

        <DialogFooter>
          <Button variant="ghost" width="full" type="button" onClick={onClose}>
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

type CreateBoxProps = {
  userId: string;
};

export function CreateBox({ userId }: CreateBoxProps) {
  // Lida com a visualização do formulário
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <BoxCardWrapper>
          <BoxCardHeader className="bg-accent-1 group-[&:hover]:bg-accent-2">
            <BoxCardHeaderContent icon={Plus} />
          </BoxCardHeader>

          <BoxCardTitle>Criar nova caixa</BoxCardTitle>
        </BoxCardWrapper>
      </button>

      {isOpen && (
        <HandleDialogRendering
          userId={userId}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
