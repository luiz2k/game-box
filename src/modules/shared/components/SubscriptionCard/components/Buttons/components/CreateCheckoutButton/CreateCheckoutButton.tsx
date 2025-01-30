"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import { useActionState } from "react";
import { createCheckoutAction } from "./action/createCheckoutAction";

export function CreateCheckoutButton() {
  const [formState, formAction, isPending] = useActionState(
    createCheckoutAction,
    null,
  );

  return (
    <form action={formAction}>
      <Button type="submit" width="full" variant="primary" disabled={isPending}>
        {formState?.messages.error
          ? formState.messages.error
          : "Faça já sua assinatura!"}
      </Button>
    </form>
  );
}
