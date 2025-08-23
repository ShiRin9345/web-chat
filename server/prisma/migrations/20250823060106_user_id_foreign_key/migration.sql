-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
