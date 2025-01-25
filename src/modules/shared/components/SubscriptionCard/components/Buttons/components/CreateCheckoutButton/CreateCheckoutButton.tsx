import { Button } from "@/modules/shared/components/Button/Button";
import { Session } from "next-auth";
import { createCheckoutAction } from "./action/createCheckoutAction";

type CreateCheckoutButtonProps = {
  session: Session | null;
};

export function CreateCheckoutButton({ session }: CreateCheckoutButtonProps) {
  return (
    <>
      {session && (
        <Button width="full" variant="primary" onClick={createCheckoutAction}>
          Faça já sua assinatura!
        </Button>
      )}
    </>
  );
}
