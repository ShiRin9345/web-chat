import { Link, useRouteContext } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

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
  return (
    <div className="px-2">
      {groups?.map &&
        groups.map((group) => (
          <React.Fragment key={group.id}>
            <LabelGroup group={group} />
            <Separator className="my-[0.45rem]" />
          </React.Fragment>
        ))}
    </div>
  )
}

function LabelGroup(group: Group) {
  const count = useCountSocket(group.group.id)
  console.log(group.group)
  return (
    <Link to={`/group/${group.id}`}>
      <button className="w-full cursor-pointer text-md  text-left rounded-sm font-semibold  transition duration-200 px-2 hover:bg-zinc-100 h-10">
        {group.group.name} {count}
      </button>
    </Link>
  )
}

function useCountSocket(groupId: string) {
  const socket = useChatSocket('', [])
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    socket.on(`${groupId}_count`, (newcount: number) => {
      setCount(newcount)
    })
    axios
      .get('/api/groupCount', {
        params: {
          groupId,
        },
      })
      .then((response) => setCount(response.data))
  }, [])
  return count
}
