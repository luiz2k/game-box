import Stripe from "stripe";
import {
  findUserByEmail,
  findUserByStripeCustomerId,
  updatedUserPlan,
} from "../prisma/user";

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
  const ORIGIN_URL = process.env.ORIGIN_URL;

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
    success_url: `${ORIGIN_URL}/perfil`,
    cancel_url: `${ORIGIN_URL}`,
    metadata: {
      userEmail: userEmail, // E-mail do usuário na aplicação
    },
  });

  // Obtém a URL da sessão de checkout e redireciona o usuário
  const sessionUrl = checkoutSession.url;

  return sessionUrl;
}

export async function stripeFindPremiumSignature() {
  // Obtém o ID da assinatura premium a partir das variáveis de ambiente
  const premiumSignatureId = process.env.STRIPE_PREMIUM_SIGNATURE_ID;

  // Verifica se o ID está definido; caso contrário, retorna null
  if (!premiumSignatureId) {
    console.warn("ID da assinatura premium não está definido.");
    return null;
  }

  try {
    // Faz a requisição para obter os detalhes da assinatura no Stripe
    const premiumSignature = await stripe.prices.retrieve(premiumSignatureId);

    // Verifica se a resposta da API contém os dados necessários
    if (
      !premiumSignature ||
      !premiumSignature.unit_amount || // Valor da assinatura não pode ser nulo
      !premiumSignature.recurring?.interval // O intervalo de cobrança deve existir
    ) {
      console.warn("Assinatura premium inválida ou dados ausentes.");
      return null;
    }

    // Retorna os dados formatados para exibição, convertendo o valor para moeda BRL
    return {
      ...premiumSignature, // Mantém os outros dados retornados pela API
      // Converte o valor para moeda BRL
      unit_amount: formatCurrency(premiumSignature.unit_amount), // Converte o valor para moeda BRL
      recurring: {
        interval: formatInterval(premiumSignature.recurring.interval), // Traduz o intervalo de tempo
      },
    };
  } catch (error) {
    // Captura e exibe erros caso a requisição falhe
    console.error("Erro ao buscar assinatura premium:", error);
    return null;
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

// Atualiza a assinatura do usuário
export async function handleWebhookCheckoutSessionCompleted(
  event: Stripe.Checkout.Session,
) {
  try {
    // Verifica se o e-mail do usuário foi enviado no metadata
    const userEmail = event.metadata?.userEmail;

    if (!userEmail) {
      throw new Error("E-mail do usuário nao encontrado.");
    }

    // Verifica se o usuário existe, se não, lança um erro
    const user = await findUserByEmail({
      email: userEmail,
    });

    if (!user) {
      throw new Error("Usuário nao encontrado.");
    }

    // Atualiza os dados do usuário para a assinatura Premium
    await updatedUserPlan({
      userId: user.id,
      plan: "Premium",
      SubscriptionId: event.subscription as string,
    });

    console.log("Assinatura do usuário atualizada!");
  } catch (error) {
    console.log("Erro ao atualizar assinatura do usuário: ", error);
  }
}

// Remove a assinatura do usuário
export async function handleWebhookCustomerSubscriptionDeleted(
  event: Stripe.Subscription,
) {
  try {
    // Verifica se o usuário existe, se não, lança um erro
    const user = await findUserByStripeCustomerId({
      stripeCustomerId: event.customer as string,
    });

    if (!user) {
      throw new Error("Usuário nao encontrado.");
    }

    // Atualiza os dados do usuário para a assinatura Free
    await updatedUserPlan({
      userId: user.id,
      plan: "Free",
      SubscriptionId: "",
    });

    console.log("Assinatura do usuário removida!");
  } catch (error) {
    console.log("Erro ao remover a assinatura do usuário: ", error);
  }
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

// Formata o valor da assinatura para moeda BRL
function formatCurrency(amount: number): string {
  return (amount / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
