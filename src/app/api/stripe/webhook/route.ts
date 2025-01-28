import { prisma } from "@/modules/shared/lib/prisma/prisma";
import { stripe } from "@/modules/shared/lib/stripe/stripe";
import { getPlanInfos } from "@/modules/shared/utils/plains";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature") as string;
  const body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 },
    );
  }

  switch (event.type) {
    // Caso uma assinatura tenha sido efetuada
    case "checkout.session.completed":
      try {
        (async () => {
          const object = event.data.object;

          // Obtém as informações sobre o plano Premium
          const planPremiumInfos = getPlanInfos("Premium");

          // Atualiza os dados do usuário para a assinatura Premium
          await prisma.user.update({
            where: {
              email: object.metadata?.userEmail,
            },
            data: {
              stripeSubscriptionId: object.subscription as string, // ID da assinatura
              plan: planPremiumInfos?.name, // Nome do plano (Premium)
            },
          });
        })();

        console.log("Assinatura do usuário atualizada!");
      } catch (error) {
        console.log("Erro ao atualizar assinatura do usuário: ", error);
      }

      break;

    // Caso uma assinatura tenha sido cancelada
    case "customer.subscription.deleted":
      try {
        (async () => {
          const object = event.data.object;

          // Obtém as informações sobre o plano Free
          const planPremiumInfos = getPlanInfos("Free");

          // Atualiza os dados do usuário para a assinatura Premium
          await prisma.user.update({
            where: {
              stripeCustomerId: object.customer as string,
            },
            data: {
              stripeSubscriptionId: "", // Deixa o ID da assinatura vazio
              plan: planPremiumInfos?.name, // Nome do plano (Free)
            },
          });
        })();

        console.log("Assinatura do usuário removida!");
      } catch (error) {
        console.log("Erro ao remover a assinatura do usuário: ", error);
      }

      break;
    default:
      console.log(`Tipo de evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
