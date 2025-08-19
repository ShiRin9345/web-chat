import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import type { Group } from 'generated/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { sidebarListQueryOptions } from '@/routes/(main)/route.tsx'
import { useSocket } from '@/providers/socketProvider.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'

const SidebarList = () => {
  const { data: groups } = useQuery(sidebarListQueryOptions)
  return (
    <>
      <Accordion type="single" collapsible>
        <AnimatedLink url="/">
          <button className="w-full cursor-pointer text-lg text-md  text-left rounded-sm font-semibold transition duration-200 px-2 hover:bg-zinc-100 h-10">
            Home
          </button>
        </AnimatedLink>
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

function LabelGroup({ group }: { group: Group }) {
  const count = useCountSocket(group.id)
  return (
    <AnimatedLink url="/group/$groupId" groupId={group.id}>
      <button className="w-full cursor-pointer text-md  text-left rounded-sm font-semibold  transition duration-200 px-2 hover:bg-zinc-100 h-10">
        {group.name} {count}
      </button>
    </AnimatedLink>
  )
}

function useCountSocket(groupId: string) {
  const { socket } = useSocket()
  const [count, setCount] = useState<number>(0)
  useEffect(() => {
    const callback = (newCount: number) => setCount(newCount)
    socket.on(`${groupId}_count`, callback)
    const getGroupCount = async () => {
      const response = await axios.get<number>('/api/groupCount', {
        params: {
          groupId,
        },
      })
      setCount(response.data)
    }
    getGroupCount()
    return () => socket.off(`${groupId}_count`, callback)
  }, [])
  return count
}
