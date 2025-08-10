import { Link, useRouteContext } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import type { Group } from 'generated/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { useSocket } from '@/providers/socketProvider.tsx'
import useChatSocket from '@/hooks/useChatSocket.tsx'

const SidebarList = () => {
  const context = useRouteContext({ from: '/(main)' })
  const { data: groups } = useQuery(context.sidebarListQueryOptions)
  return (
    <>
      <Accordion type="single" collapsible>
        <Link to="/">
          <button className="w-full cursor-pointer text-lg text-md  text-left rounded-sm font-semibold transition duration-200 px-2 hover:bg-zinc-100 h-10">
            Home
          </button>
        </Link>
        <AccordionItem value="groups">
          <AccordionTrigger className="!no-underline cursor-pointer ">
            <span className="pl-2"> Groups</span>
          </AccordionTrigger>
          <AccordionContent>
            <GroupList groups={groups} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
export default SidebarList

const GroupList: React.FC<{ groups: Array<Group> | undefined }> = ({
  groups,
}) => {
  const socket = useChatSocket('', [])
  const groupUsers = new Map<string, number>()
  useEffect(() => {
    if (!groups) return
    for (const group of groups) {
      socket.on(`${group.id}_count`, (count: number) => {
        groupUsers.set(group.id, count)
      })
    }
  }, [groups])
  console.log(groupUsers.size)
  return (
    <div className="px-2">
      {groups?.map &&
        groups.map((group) => (
          <React.Fragment key={group.id}>
            <Link to={`/group/${group.id}`}>
              <button className="w-full cursor-pointer text-md  text-left rounded-sm font-semibold  transition duration-200 px-2 hover:bg-zinc-100 h-10">
                {group.name} {groupUsers.get(group.id) && '0'}
              </button>
            </Link>
            <Separator className="my-[0.45rem]" />
          </React.Fragment>
        ))}
    </div>
  )
}
