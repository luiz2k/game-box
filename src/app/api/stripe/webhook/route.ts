import {
  handleWebhookCheckoutSessionCompleted,
  handleWebhookCustomerSubscriptionDeleted,
  stripe,
} from "@/modules/shared/lib/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature") as string;
  const body = await request.text();

  let event: Stripe.Event;

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
      await handleWebhookCheckoutSessionCompleted(event.data.object);
      break;
    // Caso uma assinatura tenha sido cancelada
    case "customer.subscription.deleted":
      await handleWebhookCustomerSubscriptionDeleted(event.data.object);
      break;
    default:
      console.log(`Tipo de evento não tratado: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
