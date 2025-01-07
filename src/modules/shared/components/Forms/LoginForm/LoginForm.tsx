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

export function LoginForm() {
  const { loginFormIsOpen, handleLoginForm, changeForm } = useFormStore();

  return (
    <>
      {loginFormIsOpen && (
        <DialogWrapping close={handleLoginForm}>
          <DialogHeader>
            <DialogHeaderTitle>Entrar</DialogHeaderTitle>
            <DialogHeaderDesc>
              Entre com seu e-mail e senha para acessar sua conta.
            </DialogHeaderDesc>
          </DialogHeader>

          <DialogBody>
            <FormInput label="E-mail" placeholder="@" width="full" />
            <FormInput label="Senha" placeholder="kwjd451q" width="full" />
          </DialogBody>

          <DialogFooter>
            <Button
              variant="ghost"
              width="full"
              type="button"
              onClick={changeForm}
            >
              Registrar
            </Button>
            <Button variant="primary" width="full" type="submit">
              Entrar
            </Button>
          </DialogFooter>
        </DialogWrapping>
      )}
    </>
  );
}
