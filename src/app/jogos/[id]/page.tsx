import { GamePage } from "@/modules/pages/GamePage/GamePage";
import { findAllGames } from "@/modules/shared/lib/prisma/game";

// Gera as rotas dinâmicas de forma estática
export async function generateStaticParams() {
  const games = await findAllGames();

  return games.map((game) => ({
    id: String(game.id),
  }));
}

export default GamePage;
