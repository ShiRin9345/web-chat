/*
  Warnings:

  - Made the column `imageUrl` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "imageUrl" SET NOT NULL;
