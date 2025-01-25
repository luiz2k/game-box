"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import { useAuthFormsStore } from "@/modules/shared/stores/authFormsStore";
import { Session } from "next-auth";

type CreateAccountButtonProps = {
  session: Session | null;
};
export function CreateAccountButton({ session }: CreateAccountButtonProps) {
  const { handleRegisterIsOpen } = useAuthFormsStore();

  return (
    <>
      {!session && (
        <Button width="full" variant="primary" onClick={handleRegisterIsOpen}>
          Crie uma conta e faça sua assinatura!
        </Button>
      )}
    </>
  );
}
