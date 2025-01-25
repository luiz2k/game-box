import { auth } from "@/auth";
import { findAllStandardBoxByUserId } from "@/modules/shared/lib/prisma/standardBox";
import { standardBoxes } from "@/modules/shared/utils/standardBoxes";
import { Buttons } from "./components/Content/Buttons";

type StandardBoxButtonsProps = {
  gameId: number;
};

export async function StandardBoxButtons({ gameId }: StandardBoxButtonsProps) {
  // Obtém os dados da sessão do usuário
  const session = await auth();

  if (!session) {
    return null;
  }

  // Busca as caixas padrão onde o jogo foi listado
  const gamesInTheBox = await findAllStandardBoxByUserId({
    userId: +session.user.id,
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
    <Buttons
      userId={+session.user.id}
      gameId={gameId}
      listedBoxes={listedBoxes}
    />
  );
}
