-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimeCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "image" TEXT,
    "typez" TEXT,
    "subDub" TEXT,
    "timeago" TEXT,

    CONSTRAINT "AnimeCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
