/*
  Warnings:

  - You are about to drop the column `userId` on the `NewFriendRequest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."NewFriendRequest" DROP CONSTRAINT "NewFriendRequest_userId_fkey";

-- AlterTable
ALTER TABLE "public"."NewFriendRequest" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "public"."NewFriendRequest" ADD CONSTRAINT "NewFriendRequest_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
