"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import { useAuthFormsStore } from "@/modules/shared/stores/authFormsStore";

export function CreateAccountButton() {
  const { handleRegisterIsOpen } = useAuthFormsStore();

  return (
    <Button width="full" variant="primary" onClick={handleRegisterIsOpen}>
      Crie uma conta e faça sua assinatura!
    </Button>
  );
}
