import {
  findAllCustomBoxByUserId,
  findAllListedGameByUserId,
} from "@/modules/shared/lib/prisma/prisma";
import { authSession } from "@/modules/shared/utils/session";
import { Content } from "./components/Content/Content";

type CustomBoxButtonsProps = {
  gameId: number;
};

export async function CustomBoxButtons({ gameId }: CustomBoxButtonsProps) {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  // Obtem as caixas customizadas do usuário
  const customBoxes = await findAllCustomBoxByUserId(session.id);

  // Obtem as caixas onde o jogo foi listado
  const listedGames = await findAllListedGameByUserId({
    userId: session.id,
    gameId: gameId,
  });

  // Verifica em quais caixa o jogo foi listado
  const listedBoxes = customBoxes.map((box) => {
    // Verifica se o jogo está listado na caixa
    const gameIsListed = listedGames.some(
      (listedGame) => listedGame.customBoxId === box.id,
    );

    return {
      constains: gameIsListed,
      ...box,
    };
  });

  return (
    <Content userId={session.id} listedBoxes={listedBoxes} gameId={gameId} />
  );
}
