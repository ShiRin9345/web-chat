import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { Group, GroupMessage } from 'generated/index'
import AnimatedLink from '@/components/animatedLink.tsx'
import { chatMessageInfiniteQueryOptions } from '@/features/reactQuery/options.ts'
import SidebarItem from '@/components/SidebarItem.tsx'

interface GroupListProps {
  groups: Array<Group> | undefined
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <div className="px-2 space-y-1">
      {groups?.map &&
        groups.map((group) => <LabelGroup key={group.id} group={group} />)}
    </div>
  )
}

function LabelGroup({ group }: { group: Group }) {
  const { data } = useInfiniteQuery(
    chatMessageInfiniteQueryOptions({
      groupId: group.id,
    }),
  )
  const messages = data
    ? data.pages.flatMap((page) => page.messages as Array<GroupMessage>)
    : []
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null

  return (
    <AnimatedLink url="/group/$groupId" groupId={group.id}>
      <SidebarItem
        icon={
          group.imageUrl ? (
            <img
              src={group.imageUrl}
              alt={group.name}
              className="w-10 h-10 rounded-full object-cover border orange:border-orange-300 dark:border-white"
            />
          ) : (
            <div className="w-10 h-10  rounded-full aspect-square border orange:border-orange-300 dark:border-white flex items-center justify-center ">
              {group.name.charAt(0).toUpperCase()}
            </div>
          )
        }
        title={group.name}
        subtitle={
          lastMessage
            ? lastMessage.type === 'PDF'
              ? '📄 [pdf]'
              : lastMessage.type === 'IMAGE'
                ? ' 🖼️ [image]'
                : lastMessage.content
            : 'No messages yet'
        }
        iconBgColor="bg-transparent"
      />
    </AnimatedLink>
  )
}

export default GroupList
