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
      subscriptionId: customerExists.subscriptions?.data[0].status as string,
      subscriptionStatus: customerExists.subscriptions?.data[0].id as string,
    };
  }

  // Cria um novo cliente
  const customer = await stripe.customers.create({
    name: username,
    email: email,
  });

  // Define a assinatura Free por padão após criar o cliente
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: process.env.STRIPE_FREE_SIGNATURE_ID,
      },
    ],
  });

  // Retorna o ID do cliente e informações da assinatura
  return {
    customerId: customer.id,
    subscriptionId: subscription.id,
  };
}
