import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios'
import { Home } from 'lucide-react'
import type { Group, User } from 'generated/index'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.tsx'
import { sidebarListQueryOptions } from '@/routes/(main)/route.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'
import { useColumnStore } from '@/store/userColumnStore.ts'
import FriendList from '@/components/FriendList.tsx'
import GroupList from '@/components/GroupList.tsx'
import AddUserSidebarList from '@/components/AddUserSidebarList.tsx'
import SidebarItem from '@/components/SidebarItem.tsx'

const SidebarList = () => {
  const { type } = useColumnStore()
  return (
    <>
      {type === 'GROUPS' && <ContactSidebarList />}
      {type === 'ADD_USER' && <AddUserSidebarList />}
    </>
  )
}

export default SidebarList

const friendQueryOptions = {
  queryKey: ['friends'],
  queryFn: async () => {
    const response = await axios.get<Array<User>>('/api/friends')
    return response.data
  },
}

const ContactSidebarList = () => {
  const { data: groups } = useQuery(sidebarListQueryOptions)
  const { data: friends } = useQuery(friendQueryOptions)
  return (
    <>
      <Accordion type="multiple">
        <AnimatedLink url="/">
          <SidebarItem
            icon={<Home className="w-5 h-5" />}
            title="Home"
            subtitle="Main dashboard"
            iconBgColor="bg-gray-100"
            iconTextColor="text-gray-600"
            hoverIconBgColor="group-hover:bg-gray-200"
          />
        </AnimatedLink>
        <AccordionItem value="groups">
          <AccordionTrigger className="!no-underline cursor-pointer ">
            <span className="pl-2"> Groups</span>
          </AccordionTrigger>
          <AccordionContent>
            <GroupList groups={groups} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="friends">
          <AccordionTrigger className="!no-underline cursor-pointer ">
            <span className="pl-2"> Friends</span>
          </AccordionTrigger>
          <AccordionContent>
            <FriendList friends={friends} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
