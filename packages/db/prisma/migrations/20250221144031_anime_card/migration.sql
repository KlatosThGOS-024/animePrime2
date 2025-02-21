-- CreateTable
CREATE TABLE "AnimeCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "typez" TEXT,
    "subDub" TEXT NOT NULL,
    "timeago" TEXT NOT NULL,

    CONSTRAINT "AnimeCard_pkey" PRIMARY KEY ("id")
);
