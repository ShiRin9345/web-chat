/*
  Warnings:

  - Added the required column `state` to the `NewFriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."NewFriendRequest" ADD COLUMN     "state" "public"."RequestState" NOT NULL;
