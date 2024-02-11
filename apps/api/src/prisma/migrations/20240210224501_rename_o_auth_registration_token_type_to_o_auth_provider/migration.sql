/*
  Warnings:

  - You are about to drop the column `type` on the `OAuthRegistrationToken` table. All the data in the column will be lost.
  - Added the required column `provider` to the `OAuthRegistrationToken` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('Twitch');

-- AlterTable
ALTER TABLE "OAuthRegistrationToken" DROP COLUMN "type",
ADD COLUMN     "provider" "OAuthProvider" NOT NULL;

-- DropEnum
DROP TYPE "OAuthRegistrationTokenType";
