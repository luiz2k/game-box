import { Box } from "@prisma/client";

// Informações sobre as caixas padrão
export const standardBoxes = [
  {
    box: Box.FAVORITE,
    name: "Favorito",
  },
  {
    box: Box.PLAYING,
    name: "Jogado",
  },
  {
    box: Box.ABANDONED,
    name: "Abandonado",
  },
  {
    box: Box.FINISHED,
    name: "Finalizado",
  },
];
