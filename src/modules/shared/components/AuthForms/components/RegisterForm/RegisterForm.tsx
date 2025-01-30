"use client";

import { useActionState } from "react";
import { useAuthFormsStore } from "../../../../stores/authFormsStore";
import { Button } from "../../../Button/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderDesc,
  DialogHeaderTitle,
  DialogWrapping,
} from "../../../Dialog/Dialog";
import { FormInput } from "../../../Input/Input";
import { registerAction } from "./actions/registerAction";

// Formulário de registro
export function RegisterForm() {
  const { handleRegisterIsOpen, changeForm } = useAuthFormsStore();

  const [formState, formAction, isPending] = useActionState(
    registerAction,
    null,
  );

  return (
    <DialogWrapping close={handleRegisterIsOpen} action={formAction}>
      <DialogHeader>
        <DialogHeaderTitle>Registro</DialogHeaderTitle>

        <DialogHeaderDesc>
          {/* Exibe mensagens de sucesso ou erro do formulário */}
          {formState?.messages && (
            <>
              {formState.messages.success && (
                <p className="text-green-600">{formState.messages.success}</p>
              )}

              {formState.messages.error && (
                <p className="text-red-600">{formState.messages.error}</p>
              )}
            </>
          )}

          {/* Se não houver mensagens, exibe a mensagem padrão */}
          {!formState?.messages && <p>Crie uma conta e organize seus jogos.</p>}
        </DialogHeaderDesc>
      </DialogHeader>

      <DialogBody>
        <FormInput
          label="Usuário"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Exemplo"
          error={formState?.inputErrors?.username}
          defaultValue={formState?.inputValues?.username}
          autoFocus
          width="full"
        />
        <FormInput
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="@"
          error={formState?.inputErrors?.email}
          defaultValue={formState?.inputValues?.email}
          width="full"
        />
        <FormInput
          label="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="kwjd451q"
          error={formState?.inputErrors?.password}
          defaultValue={formState?.inputValues?.password}
          width="full"
        />
        <FormInput
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="kwjd451q"
          error={formState?.inputErrors?.confirmPassword}
          defaultValue={formState?.inputValues?.confirmPassword}
          width="full"
        />
      </DialogBody>

      <DialogFooter>
        <Button
          variant="ghost"
          width="full"
          type="button"
          onClick={changeForm}
          disabled={isPending}
        >
          Entrar
        </Button>
        <Button
          variant="primary"
          width="full"
          type="submit"
          disabled={isPending}
        >
          Registrar
        </Button>
      </DialogFooter>
    </DialogWrapping>
  );
}
