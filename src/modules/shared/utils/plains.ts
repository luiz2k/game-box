// Informações dos planos
const plans = [
  {
    name: "Free",
    boxLimit: 0,
    gameLimit: 10,
  },
  {
    name: "Premium",
    boxLimit: "Unlimited",
    gameLimit: "Unlimited",
  },
];

// Busca as informações de um plano pelo seu nome
export function getPlanInfos(planName: string) {
  const plan = plans.find((plan) => plan.name === planName);

  if (!plan) {
    return null;
  }

  return plan;
}
