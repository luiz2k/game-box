"use client";

import { useActionState } from "react";
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
import { registerAction } from "./actions/registerAction";

// Formulário de registro
export function RegisterForm() {
  const { handleRegisterForm, changeForm } = useFormStore();

  const [formState, formAction, isPending] = useActionState(
    registerAction,
    null,
  );

  return (
    <DialogWrapping close={handleRegisterForm} action={formAction}>
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

          {/* Se não houver mensagens, exibe a menssagem padrão */}
          {!formState?.messages && <p>Crie uma conta e organize seus jogos.</p>}
        </DialogHeaderDesc>
      </DialogHeader>

      <DialogBody>
        <FormInput
          label="Usuário"
          name="username"
          placeholder="Exemplo"
          error={formState?.inputErrors?.username?.toString()}
          defaultValue={formState?.inputValues?.username.toString()}
          autoFocus
          width="full"
        />
        <FormInput
          label="E-mail"
          name="email"
          placeholder="@"
          error={formState?.inputErrors?.email?.toString()}
          defaultValue={formState?.inputValues?.email.toString()}
          width="full"
        />
        <FormInput
          label="Senha"
          name="password"
          placeholder="kwjd451q"
          error={formState?.inputErrors?.password?.toString()}
          defaultValue={formState?.inputValues?.password.toString()}
          width="full"
        />
        <FormInput
          label="Confirmar senha"
          name="confirmPassword"
          placeholder="kwjd451q"
          error={formState?.inputErrors?.confirmPassword?.toString()}
          defaultValue={formState?.inputValues?.confirmPassword.toString()}
          width="full"
        />
      </DialogBody>

      <DialogFooter>
        <Button variant="ghost" width="full" type="button" onClick={changeForm}>
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
