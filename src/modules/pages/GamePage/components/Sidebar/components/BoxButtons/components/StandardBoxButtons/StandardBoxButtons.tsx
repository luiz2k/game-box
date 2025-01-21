import { authSession } from "@/modules/shared/utils/session";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import { Content } from "./components/Content/Content";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/standardBox";

type StandardBoxButtonsProps = {
  gameId: number;
};

export async function StandardBoxButtons({ gameId }: StandardBoxButtonsProps) {
  // Obtém os dados da sessão do usuário
  const session = await authSession();

  // Busca as caixas padrão onde o jogo foi listado
  const gamesInTheBox = await findAllStandardBoxByUserId({
    userId: session.id,
    gameId: gameId,
  });

  // Obtém todas as caixas padrão disponíveis
  const boxes = standardBoxes;

  // Verifica em quais das caixas padrão o jogo foi listado
  const listedBoxes = boxes.map((box) => {
    // Verifica se o jogo foi listado na caixa
    const contains = gamesInTheBox.some((list) => list.box === box.box);

    return {
      ...box,
      contains,
    };
  });

  return (
    <Content userId={session.id} gameId={gameId} listedBoxes={listedBoxes} />
  );
}
