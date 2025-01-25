import { Button } from "@/modules/shared/components/Button/Button";
import { stripeCreateCheckout } from "@/modules/shared/lib/stripe/stripe";
import { Session } from "next-auth";

type CreateCheckoutButtonProps = {
  session: Session | null;
};

export function CreateCheckoutButton({ session }: CreateCheckoutButtonProps) {
  return (
    <>
      {session && (
        <Button
          width="full"
          variant="primary"
          onClick={async () => {
            "use server";

            await stripeCreateCheckout({ userId: +session?.user.id });
          }}
        >
          Faça já sua assinatura!
        </Button>
      )}
    </>
  );
}
