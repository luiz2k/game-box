import { PrismaClient } from "@prisma/client";
import data from "./data.json";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const games = data.map(({ release_date, ...rest }) => ({
  release_date: new Date(release_date),
  ...rest,
}));

(async () => {
  await prisma.game.createMany({
    data: games,
  });
})();
