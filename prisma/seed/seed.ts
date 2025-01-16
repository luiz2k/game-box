import { PrismaClient } from "@prisma/client";
import data from "./data.json";

// Cria uma instância do Prisma
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Faz a formatação da data dos games
const games = data.map(({ release_date, ...rest }) => ({
  release_date: new Date(release_date),
  ...rest,
}));

(async () => {
  // Insere os jogos na tabela
  await prisma.game.createMany({
    data: games,
  });
})();
