"use client";

import { useFormStore } from "../../../stores/formStore";
import { Button } from "../../Button/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderDesc,
  DialogHeaderTitle,
  DialogWrapping,
} from "../../Dialog/Dialog";
import { FormInput } from "../../Input/Input";

export function RegisterForm() {
  const { registerFormIsOpen, changeForm } = useFormStore();

  return (
    <>
      {registerFormIsOpen && (
        <DialogWrapping>
          <DialogHeader>
            <DialogHeaderTitle>Registro</DialogHeaderTitle>
            <DialogHeaderDesc>
              Crie uma conta e organize seus jogos.
            </DialogHeaderDesc>
          </DialogHeader>

          <DialogBody>
            <FormInput label="Usuário" placeholder="Exemplo" width="full" />
            <FormInput label="E-mail" placeholder="@" width="full" />
            <FormInput label="Senha" placeholder="kwjd451q" width="full" />
            <FormInput
              label="Confirmar senha"
              placeholder="kwjd451q"
              width="full"
            />
          </DialogBody>

          <DialogFooter>
            <Button
              variant="ghost"
              width="full"
              type="button"
              onClick={changeForm}
            >
              Entrar
            </Button>
            <Button variant="primary" width="full" type="submit">
              Registrar
            </Button>
          </DialogFooter>
        </DialogWrapping>
      )}
    </>
  );
}
