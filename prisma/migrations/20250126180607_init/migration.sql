-- CreateEnum
CREATE TYPE "Box" AS ENUM ('FAVORITE', 'PLAYING', 'ABANDONED', 'FINISHED');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(25) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "plan" VARCHAR(25) NOT NULL DEFAULT 'Free',
    "stripe_customer_id" TEXT NOT NULL,
    "stripe_subscription_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "genre" VARCHAR(25)[],
    "developer" VARCHAR(50)[],
    "distributor" VARCHAR(50)[],
    "release_date" TIMESTAMP(3) NOT NULL,
    "cover" VARCHAR(98) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "standard_boxes" (
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "box" "Box" NOT NULL,

    CONSTRAINT "standard_boxes_pkey" PRIMARY KEY ("user_id","game_id","box")
);

-- CreateTable
CREATE TABLE "custom_boxes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "custom_boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listed_games" (
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "custom_box_id" INTEGER NOT NULL,

    CONSTRAINT "listed_games_pkey" PRIMARY KEY ("user_id","game_id","custom_box_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");

-- AddForeignKey
ALTER TABLE "standard_boxes" ADD CONSTRAINT "standard_boxes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_boxes" ADD CONSTRAINT "standard_boxes_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "custom_boxes" ADD CONSTRAINT "custom_boxes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listed_games" ADD CONSTRAINT "listed_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listed_games" ADD CONSTRAINT "listed_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "listed_games" ADD CONSTRAINT "listed_games_custom_box_id_fkey" FOREIGN KEY ("custom_box_id") REFERENCES "custom_boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
