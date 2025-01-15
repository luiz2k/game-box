"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
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
import { loginAction } from "./actions/loginAction";

// Formulário de login
export function LoginForm() {
  const { handleLoginForm, changeForm } = useFormStore();

  const [formState, formAction, isPending] = useActionState(loginAction, null);

  const router = useRouter();

  // Quando o usuário logar, fecha o formulário e recarrega a página
  useEffect(() => {
    if (formState?.messages?.success) {
      handleLoginForm();
      router.refresh();
    }
  }, [formState?.messages?.success, handleLoginForm, router]);

  return (
    <DialogWrapping close={handleLoginForm} action={formAction}>
      <DialogHeader>
        <DialogHeaderTitle>Entrar</DialogHeaderTitle>
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
          {!formState?.messages && (
            <p>Entre com seu e-mail e senha para acessar sua conta.</p>
          )}
        </DialogHeaderDesc>
      </DialogHeader>

      <DialogBody>
        <FormInput
          label="E-mail"
          name="email"
          placeholder="@"
          error={formState?.inputErrors?.email?.toString()}
          defaultValue={formState?.inputValues?.email.toString()}
          autoFocus
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
      </DialogBody>

      <DialogFooter>
        <Button variant="ghost" width="full" type="button" onClick={changeForm}>
          Registrar
        </Button>
        <Button
          variant="primary"
          width="full"
          type="submit"
          disabled={isPending}
        >
          Entrar
        </Button>
      </DialogFooter>
    </DialogWrapping>
  );
}
