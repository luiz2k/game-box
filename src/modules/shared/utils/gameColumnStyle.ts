// Define o estilo das colunas de acordo com a quantidade de jogos listados
export const gameColumnStyle = (length: number) => {
  // Uma coluna
  const columnOne =
    "grid gap-4 grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))]";

  // Duas colunas
  const columnTwo =
    "grid gap-4 grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] min-[706px]:grid-cols-[repeat(auto-fit,_minmax(245px,330.66px))]";

  // Três colunas
  const columnThree =
    "grid gap-4 grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))] min-[534px]:grid-cols-[repeat(auto-fit,_minmax(245px,330.66px))]";

  // Escolhe o estilo de acordo com a quantidade de jogos listados
  const styles =
    length >= 3 ? columnOne : length >= 2 ? columnTwo : columnThree;

  return styles;
};
