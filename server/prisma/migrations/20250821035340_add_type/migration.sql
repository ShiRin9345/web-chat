/*
  Warnings:

  - Added the required column `type` to the `PrivateMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."PrivateMessage" ADD COLUMN     "type" "public"."MessageType" NOT NULL;
