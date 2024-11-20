/*
  Warnings:

  - Added the required column `password` to the `LinkingToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkingToken" ADD COLUMN     "password" TEXT NOT NULL;
