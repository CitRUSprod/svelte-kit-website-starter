/*
  Warnings:

  - A unique constraint covering the columns `[twitchId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OAuthRegistrationTokenType" AS ENUM ('Twitch');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "twitchId" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OAuthRegistrationToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "OAuthRegistrationTokenType" NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OAuthRegistrationToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthRegistrationToken_token_key" ON "OAuthRegistrationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_twitchId_key" ON "User"("twitchId");
