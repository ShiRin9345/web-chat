-- CreateTable
CREATE TABLE "public"."NewFriendRequest" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "NewFriendRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."NewFriendRequest" ADD CONSTRAINT "NewFriendRequest_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NewFriendRequest" ADD CONSTRAINT "NewFriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
