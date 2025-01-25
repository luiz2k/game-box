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
    subscriptionId: subscription.id,
  };
}
