import { CustomBoxes } from "./components/CustomBoxes/CustomBoxes";
import { StandardBoxes } from "./components/StandardBoxes/StandardBoxes";

export function Boxes() {
  return (
    <>
      {/* Caixas padrão */}
      <StandardBoxes />

      {/* Caixas customizadas */}
      <CustomBoxes />
    </>
  );
}
