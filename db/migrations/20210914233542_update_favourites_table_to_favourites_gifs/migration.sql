/*
  Warnings:

  - You are about to drop the `Favourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Favourites";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FavouritesGifs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "FavouritesGifs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
