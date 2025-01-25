"use client";

import { Button } from "@/modules/shared/components/Button/Button";
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeaderDesc,
  DialogHeaderTitle,
  DialogWrapping,
} from "@/modules/shared/components/Dialog/Dialog";
import { useActionState, useEffect, useState } from "react";
import { cancelSubscriptionAction } from "./action/cancelSubscriptionAction";

type HandleDialogRenderingProps = {
  onClose: () => void;
  subscription: {
    current_period_end: string;
    plan: {
      nickname: string;
    };
  };
};

export function HandleDialogRendering({
  onClose,
  subscription,
}: HandleDialogRenderingProps) {
  const [formState, formAction] = useActionState(
    cancelSubscriptionAction,
    null,
  );

  // Quando cancelar a assinatura, fecha o formulário
  useEffect(() => {
    if (formState?.messages.success) {
      onClose();
    }
  }, [formState?.messages.success, onClose]);

  return (
    <DialogWrapping close={onClose} action={formAction}>
      <DialogHeader>
        <DialogHeaderTitle className="text-left">
          Cancelando assinatura
        </DialogHeaderTitle>
        {formState?.messages.error && (
          <DialogHeaderDesc className="text-left">
            <p className="text-red-600">{formState?.messages.error}</p>
          </DialogHeaderDesc>
        )}
      </DialogHeader>

      <DialogBody>
        <div>
          <p>Tem ceteza que deseja cancelar a sua assinatura?</p>
          <p>
            Após fazer isso você terá acesso ao plano{" "}
            <span className="font-bold">{subscription.plan.nickname}</span> até
            o dia{" "}
            <span className="font-bold">{subscription.current_period_end}</span>
            .
          </p>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="ghost" width="full" type="button" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="primary"
          width="full"
          className="bg-red-600 hover:bg-red-700"
        >
          Confirmar
        </Button>
      </DialogFooter>
    </DialogWrapping>
  );
}

type CancelSubscriptionProps = {
  subscription: {
    current_period_end: string;
    plan: {
      nickname: string;
    };
  };
};
export function CancelSubscription({ subscription }: CancelSubscriptionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        type="submit"
        width="full"
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        Cancelar assinatura
      </Button>

      {isOpen && (
        <HandleDialogRendering
          onClose={() => setIsOpen(false)}
          subscription={subscription}
        />
      )}
    </>
  );
}
