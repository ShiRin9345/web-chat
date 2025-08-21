-- DropForeignKey
ALTER TABLE "public"."PrivateMessage" DROP CONSTRAINT "PrivateMessage_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PrivateMessage" DROP CONSTRAINT "PrivateMessage_senderId_fkey";

-- AddForeignKey
ALTER TABLE "public"."PrivateMessage" ADD CONSTRAINT "PrivateMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrivateMessage" ADD CONSTRAINT "PrivateMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
