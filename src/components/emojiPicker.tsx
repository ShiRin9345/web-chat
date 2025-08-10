import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Smile } from 'lucide-react'
import React from 'react'

interface Props {
  onChange: (value: string) => void
}
const EmojiPicker: React.FC<Props> = ({ onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="cursor-pointer text-zinc-300 transform duration-200 hover:text-zinc-500" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  )
}
export default EmojiPicker
