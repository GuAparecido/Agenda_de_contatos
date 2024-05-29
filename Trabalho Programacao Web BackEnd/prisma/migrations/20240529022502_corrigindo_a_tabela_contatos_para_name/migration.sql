/*
  Warnings:

  - You are about to drop the column `nome` on the `Contatos` table. All the data in the column will be lost.
  - Added the required column `name` to the `Contatos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contatos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Contatos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contatos" ("email", "id", "phone", "userId") SELECT "email", "id", "phone", "userId" FROM "Contatos";
DROP TABLE "Contatos";
ALTER TABLE "new_Contatos" RENAME TO "Contatos";
PRAGMA foreign_key_check("Contatos");
PRAGMA foreign_keys=ON;
