/*
  Warnings:

  - Added the required column `type` to the `GroupMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."MessageType" AS ENUM ('IMAGE', 'TEXT', 'PDF');

-- AlterTable
ALTER TABLE "public"."GroupMessage" ADD COLUMN     "type" "public"."MessageType" NOT NULL;
