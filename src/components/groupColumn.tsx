import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useParams } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useGroupColumnStore } from '@/store/useGroupColumnStore.ts'
import { groupWithMembersQueryOptions } from '@/features/reactQuery/options.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Button } from '@/components/ui/button.tsx'

const GroupColumn = () => {
  const { open } = useGroupColumnStore()
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { data: group } = useQuery(groupWithMembersQueryOptions(groupId))
  useGSAP(() => {
    gsap.to('#column', {
      width: open ? 320 : 0,
      duration: 0.2,
      ease: 'none',
    })
  }, [open])
  return (
    <div id="column" className="bg-zinc-200 h-full flex flex-col w-[320px]">
      <h1>{group?.name}</h1>
      <div className="flex">
        {group?.members.map((member) => (
          <Avatar>
            <AvatarImage src={member.imageUrl} alt="avatar" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <Button variant="destructive">Quit</Button>
    </div>
  )
}
export default GroupColumn
