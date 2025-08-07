/*
  Warnings:

  - You are about to drop the column `receiver` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Message" DROP COLUMN "receiver",
DROP COLUMN "sender";
