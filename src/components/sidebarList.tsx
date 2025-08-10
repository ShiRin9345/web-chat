import { Link, useRouteContext } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import type { Group } from 'generated/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx'
import { Separator } from '@/components/ui/separator.tsx'

const SidebarList = () => {
  const context = useRouteContext({ from: '/(main)' })
  const { data: groups } = useQuery(context.sidebarListQueryOptions)
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="groups">
          <AccordionTrigger className="!no-underline cursor-pointer">
            Groups
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
            <Link to={`/group/${group.id}`}>
              <button
                className="w-full cursor-pointer text-md  text-left rounded-sm font-semibold  transition duration-200 px-2 hover:bg-zinc-100 h-10"
                onClick={() => {}}
              >
                {group.name}
              </button>
            </Link>
            <Separator className="my-[0.45rem]" />
          </React.Fragment>
        ))}
    </div>
  )
}
