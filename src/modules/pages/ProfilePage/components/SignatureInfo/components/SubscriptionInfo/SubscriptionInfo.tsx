import { auth } from "@/auth";
import { Button } from "@/modules/shared/components/Button/Button";
import { prisma } from "@/modules/shared/lib/prisma/prisma";
import { stripeFindCustomerSubscription } from "@/modules/shared/lib/stripe/stripe";

export async function SubscriptionInfo() {
  // Busca a sessão do usuário, se não encontrar, retorna
  const session = await auth();

  if (!session) {
    return null;
  }

  // Busca o usuário pelo ID, se nao encontrar, retorna
  const user = await prisma.user.findUnique({
    where: {
      id: +session?.user.id,
    },
    select: {
      stripeCustomerId: true,
    },
  });

  if (!user) {
    return null;
  }

  // Obtém informaçoes sobre a assinatura do usuário
  const subscription = await stripeFindCustomerSubscription({
    customerId: user.stripeCustomerId,
  });

  return (
    <>
      {subscription && (
        <div className="w-full min-w-[18.75rem] space-y-5 rounded-2xl bg-black-2 p-4">
          <h2 className="text-2xl font-bold">Sua assinatura</h2>

          <div className="space-y-1 text-sm">
            <p>
              <span className="font-bold">Próxima cobrança:</span>{" "}
              {subscription.current_period_end}
            </p>
            <p>
              <span className="font-bold">Valor:</span>{" "}
              {subscription.plan.amount}
            </p>
            <p>
              <span className="font-bold">Ciclo:</span>{" "}
              {subscription.plan.interval}
            </p>
            <p>
              <span className="font-bold">Status:</span>{" "}
              <span className="text-green-600">{subscription.status}</span>
            </p>
          </div>

          <Button
            width="full"
            variant="primary"
            className="bg-red-600 hover:bg-red-700"
          >
            Cancelar assinatura
          </Button>
        </div>
      )}
    </>
  );
}
