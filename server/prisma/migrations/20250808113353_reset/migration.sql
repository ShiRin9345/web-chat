/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrivateMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroupMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."GroupMessage" DROP CONSTRAINT "GroupMessage_groupId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupMessage" DROP CONSTRAINT "GroupMessage_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrivateMessage" DROP CONSTRAINT "PrivateMessage_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrivateMessage" DROP CONSTRAINT "PrivateMessage_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GroupMembers" DROP CONSTRAINT "_GroupMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_GroupMembers" DROP CONSTRAINT "_GroupMembers_B_fkey";

-- DropTable
DROP TABLE "public"."Group";

-- DropTable
DROP TABLE "public"."GroupMessage";

-- DropTable
DROP TABLE "public"."PrivateMessage";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."_GroupMembers";

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
