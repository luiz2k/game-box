"use client";

import { BoxCard } from "@/modules/pages/ProfilePage/components/BoxCard/BoxCard";
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
import { useState } from "react";
import { createBoxAction } from "../actions/createBoxAction";

type CreateBoxProps = {
  userId: number;
};
export function CreateBox({ userId }: CreateBoxProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAction = async (formData: FormData) => {
    const name = formData.get("name") as string;

    const res = await createBoxAction({
      userId: userId,
      name: name,
    });

    if (res?.messages.error) {
      setErrorMessage(res.messages.error);
    }

    handleClose();
  };

  return (
    <>
      <button onClick={handleClose}>
        <BoxCard
          title="Criar nova caixa"
          icon={Plus}
          className="bg-accent-1 group-[&:hover]:bg-accent-2"
        />
      </button>

      {isOpen && (
        <DialogWrapping close={handleClose} action={handleAction}>
          <DialogHeader>
            <DialogHeaderTitle className="text-left">
              Criando uma nova caixa
            </DialogHeaderTitle>
            {errorMessage && (
              <DialogHeaderDesc className="text-left">
                <p className="text-red-600">{errorMessage}</p>
              </DialogHeaderDesc>
            )}
          </DialogHeader>

          <DialogBody>
            <FormInput width="full" name="name" label="Nome da caixa" />
          </DialogBody>

          <DialogFooter>
            <Button
              variant="ghost"
              width="full"
              type="button"
              onClick={handleClose}
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
