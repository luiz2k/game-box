import { CustomBoxButtons } from "./components/CustomBoxButtons/CustomBoxButtons";
import { StandardBoxButtons } from "./components/StandardBoxButtons/StandardBoxButtons";

type BoxButtonsProps = {
  gameId: number;
};

export async function BoxButtons({ gameId }: BoxButtonsProps) {
  return (
    <>
      {/* Gerencia as caixas padrão */}
      <StandardBoxButtons gameId={gameId} />

      {/* Gerencia as caixas customizadas */}
      <CustomBoxButtons gameId={gameId} />
    </>
  );
}
