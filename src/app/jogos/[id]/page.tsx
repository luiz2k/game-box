import { GamePage } from "@/modules/pages/GamePage/GamePage";
import { findAllGames, findGameById } from "@/modules/shared/lib/prisma/game";
import { Metadata } from "next";

type GenerateMetadataProps = {
  params: Promise<{ id: string }>;
};

// Gera a metadata da página de forma dinâmica
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { id } = await params;

  // Busca o jogo pelo id da rota
  const game = await findGameById({
    gameId: +id,
  });

  // Define o nome do jogo como título da página
  return {
    title: `${game?.title} - GAME BOX`,
  };
}

// Gera as rotas dinâmicas de forma estática
export async function generateStaticParams() {
  const games = await findAllGames();

  return games.map((game) => ({
    id: String(game.id),
  }));
}

export default GamePage;
