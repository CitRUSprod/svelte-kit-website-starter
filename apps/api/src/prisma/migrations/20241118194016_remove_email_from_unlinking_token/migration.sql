/*
  Warnings:

  - You are about to drop the column `email` on the `UnlinkingToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UnlinkingToken_email_key";

-- AlterTable
ALTER TABLE "UnlinkingToken" DROP COLUMN "email";
