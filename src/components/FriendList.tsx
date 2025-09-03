import React from 'react'
import type { User } from 'generated/index'
import { Separator } from '@/components/ui/separator.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'
import { useUserOnline } from '@/hooks/useUserOnline.ts'
import SidebarItem from '@/components/SidebarItem.tsx'

interface FriendListProps {
  friends: Array<User> | undefined
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <div className="px-2 space-y-1">
      {friends?.map &&
        friends.map((friend) => <FriendItem key={friend.id} friend={friend} />)}
    </div>
  )
}

const FriendItem: React.FC<{ friend: User }> = ({ friend }) => {
  const { online } = useUserOnline(friend)
  return (
    <AnimatedLink
      url="/conversation/$friendUserId"
      friendUserId={friend.userId}
    >
      <SidebarItem
        icon={
          <div className="relative">
            <img
              src={friend.imageUrl}
              className="size-8 rounded-full aspect-square object-cover ring-2 ring-white"
              alt="avatar"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                online ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
          </div>
        }
        title={friend.fullName}
        subtitle={online ? 'Available for chat' : 'Last seen recently'}
        iconBgColor="bg-transparent"
        iconTextColor="text-transparent"
        hoverIconBgColor=""
        children={
          online && (
            <span className="text-xs text-green-600 font-medium">Online</span>
          )
        }
      />
    </AnimatedLink>
  )
}

export default FriendList
