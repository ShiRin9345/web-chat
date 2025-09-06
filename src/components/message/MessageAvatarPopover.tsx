import type { User } from 'generated/index'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { UserProfile } from '@/components/UserProfile'

interface Props {
  isSelfMessage: boolean
  userImageUrl?: string
  senderImageUrl?: string
  sender: User
}

export function MessageAvatarPopover({
  isSelfMessage,
  userImageUrl,
  senderImageUrl,
  sender,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="ml-2 size-12 cursor-pointer">
          <AvatarImage
            src={isSelfMessage ? userImageUrl : senderImageUrl}
            alt="avatar"
            className="object-cover"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent side={isSelfMessage ? 'left' : 'right'} className="p-0">
        <UserProfile userId={sender.userId} sender={sender} />
      </PopoverContent>
    </Popover>
  )
}
