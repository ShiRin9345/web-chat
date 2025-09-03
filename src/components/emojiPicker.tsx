import React from 'react'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Smile } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'

interface Props {
  onChange: (value: string) => void
}
const EmojiPicker: React.FC<Props> = ({ onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="chatInput_icon" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none dark:bg-gray-900 dark:border-gray-700"
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
