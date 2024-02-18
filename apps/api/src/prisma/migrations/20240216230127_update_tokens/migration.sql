/*
  Warnings:

  - You are about to drop the column `confirmedEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EmailConfirmationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailConfirmationToken" DROP CONSTRAINT "EmailConfirmationToken_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "confirmedEmail";

-- DropTable
DROP TABLE "EmailConfirmationToken";

-- CreateTable
CREATE TABLE "RegistrationToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegistrationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailUpdateToken" (
    "id" SERIAL NOT NULL,
    "tokenFrom" TEXT NOT NULL,
    "tokenTo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailUpdateToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationToken_token_key" ON "RegistrationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationToken_email_key" ON "RegistrationToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationToken_username_key" ON "RegistrationToken"("username");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUpdateToken_tokenFrom_key" ON "EmailUpdateToken"("tokenFrom");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUpdateToken_tokenTo_key" ON "EmailUpdateToken"("tokenTo");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUpdateToken_email_key" ON "EmailUpdateToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUpdateToken_userId_key" ON "EmailUpdateToken"("userId");

-- AddForeignKey
ALTER TABLE "EmailUpdateToken" ADD CONSTRAINT "EmailUpdateToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
