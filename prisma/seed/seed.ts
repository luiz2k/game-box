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
  for (const game of games) {
    // Insere o jogo na tabela dependendo de sua existência
    await prisma.game.upsert({
      where: {
        id: game.id,
      },
      update: {}, // Nada para atualizar
      create: game, // Cria o jogo
    });
  }
})();
