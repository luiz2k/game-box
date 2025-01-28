import { redirect } from "next/navigation";
import Stripe from "stripe";

// Cria uma instância do Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type GetStripeCustomerByEmail = {
  email: string;
};

// Busca um cliente no Stripe pelo e-mail
export async function getStripeCustomerByEmail({
  email,
}: GetStripeCustomerByEmail) {
  const customer = await stripe.customers.list({
    email: email,
    expand: ["data.subscriptions"], // Obtém informações da assinatura
  });

  return customer.data[0];
}

type StripeCreateCustomer = {
  username: string;
  email: string;
};

// Cria um cliente no Stripe
export async function stripeCreateCustomer({
  username,
  email,
}: StripeCreateCustomer) {
  // Verifica se o cliente já existe
  // Se existir, retorna o mesmo
  const customerExists = await getStripeCustomerByEmail({
    email: email,
  });

  if (customerExists) {
    return {
      customerId: customerExists.id,
    };
  }

  // Cria um novo cliente
  const customer = await stripe.customers.create({
    name: username,
    email: email,
  });

  // Retorna o ID do cliente e informações da assinatura
  return {
    customerId: customer.id,
  };
}

type StripeCreateCheckout = {
  userEmail: string;
};

// Inicia um checkout (pagamento)
export async function stripeCreateCheckout({
  userEmail,
}: StripeCreateCheckout) {
  // Obtém o cliente no Stripe pelo seu e-mail, se não existir, retona null
  const customer = await getStripeCustomerByEmail({
    email: userEmail,
  });

  if (!customer) {
    return null;
  }

  // Obtém as assinaturas do cliente
  const signatures = await stripe.subscriptions.list({
    customer: customer.id,
    status: "active", // Apenas assinaturas ativas
  });

  // Identificador da assinatura Premium
  const premiumSignaratureId = process.env.STRIPE_PREMIUM_SIGNATURE_ID;

  // Verifica se a assinatura atual do cliente é Premium, se for premium, bloqueia
  const isPremiumAccount = signatures.data.some((signature) =>
    signature.items.data.some((item) => item.price.id === premiumSignaratureId),
  );

  if (isPremiumAccount) {
    return null;
  }

  // Obtém a URL de origem
  const ORIGIN = process.env.__NEXT_PRIVATE_ORIGIN;

  // Inicia a sessão de checkout (pagamento)
  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_SIGNATURE_ID,
        quantity: 1,
      },
    ],
    payment_method_types: ["card"],
    mode: "subscription",
    customer: customer.id,
    success_url: `${ORIGIN}/perfil`,
    cancel_url: `${ORIGIN}`,
    metadata: {
      userId: userEmail, // Id do usuário na aplicação
    },
  });

  // Obtém a URL da sessão de checkout e redireciona o usuário
  const sessionUrl = checkoutSession.url;

  if (sessionUrl) {
    redirect(sessionUrl);
  }
}

export type SubscriptionPlan = Stripe.Subscription & {
  plan: {
    amount: number;
    interval: string;
  };
};

type StripeFindCustomerSubscription = {
  customerId: string;
};

// Busca a assinatura ativa do usuário
export async function stripeFindCustomerSubscription({
  customerId,
}: StripeFindCustomerSubscription) {
  // Obtém as assinaturas ativas do cliente, se não existir, retorna null
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active", // Apenas assinaturas ativas
  });

  if (subscriptions.data.length === 0) {
    return null;
  }

  // Pega os dados da assinatura
  const subscriptionData = subscriptions.data[0] as SubscriptionPlan;

  // Formata os dados de assinatura e retorna
  const formattedSubscriptionData = {
    ...subscriptionData,
    plan: {
      amount: (subscriptionData.plan.amount / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      interval: formatInterval(subscriptionData.plan.interval),
    },
    current_period_end: new Date(
      subscriptionData?.current_period_end * 1000,
    ).toLocaleDateString("pt-BR"),
    status: formatStatus(subscriptionData.status),
  };

  return formattedSubscriptionData;
}

type stripeCancelSubscription = {
  subscriptionId: string;
};

// Cancela a assinatura no final do ciclo
export async function stripeCancelSubscription({
  subscriptionId,
}: stripeCancelSubscription) {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

// Formata o intervalo da assinatura
function formatInterval(interval: string) {
  switch (interval) {
    case "month":
      return "Mensal";
    case "year":
      return "Anual";
    default:
      return interval;
  }
}

// Formata o status da assinatura
function formatStatus(status: string) {
  switch (status) {
    case "active":
      return "Ativo";
    case "trialing":
      return "Trial";
    default:
      return status;
  }
}
