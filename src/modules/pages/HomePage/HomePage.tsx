import { SubscriptionCard } from "@/modules/shared/components/SubscriptionCard/SubscriptionCard";
import { Cover } from "./components/Cover/Cover";
import { PopularGames } from "./components/PopularGames/PopularGames";

export function HomePage() {
  return (
    <>
      <Cover />

      <PopularGames />

      <SubscriptionCard />
    </>
  );
}
