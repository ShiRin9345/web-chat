import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { Loader } from 'lucide-react'
import type { Group, User } from 'generated/index'
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
import { useColumnStore } from '@/store/userColumnStore.ts'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'

const SidebarList = () => {
  const { type } = useColumnStore()
  return (
    <>
      {type === 'GROUPS' && <GroupSideBarList />}
      {type === 'ADD_USER' && <AddUserSidebarList />}
    </>
  )
}
export default SidebarList

const GroupSideBarList = () => {
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

const addUserFormSchema = z.object({
  name: z.string(),
})

function AddUserSidebarList() {
  const [users, setUsers] = useState<Array<User>>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm({
    defaultValues: {
      name: '',
    },
    validators: {
      onSubmit: addUserFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { name } = value
      try {
        const response = await axios.get<Array<User>>('/api/users', {
          params: {
            name,
          },
        })
        setUsers(response.data)
      } catch (e) {
        console.error(e)
      }
    },
  })
  return (
    <>
      <AnimatedLink url="/friendRequest">
        <Button>See request</Button>
      </AnimatedLink>

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsLoading(true)
          await form.handleSubmit()
          setIsLoading(false)
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <Input
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Type user's name"
              name="name"
            />
          )}
        />
        {form.state.isSubmitting ? (
          <Loader className="animate-spin" />
        ) : (
          <div>
            {users.length === 0 ? (
              <span>null</span>
            ) : (
              users.map((user) => (
                <div className="w-full h-20" key={user.id}>
                  <img
                    src={user.imageUrl}
                    className="size-12 rounded-full aspect-square object-cover"
                    alt="avatar"
                  />
                  <div className="flex gap-2">
                    <span>{user.fullName}</span>
                    <button
                      onClick={async () => {
                        await axios.post('/api/friendRequest', {
                          toUserId: user.userId,
                        })
                      }}
                    >
                      add
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </form>
    </>
  )
}
