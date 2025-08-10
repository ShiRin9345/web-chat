import { createFileRoute } from '@tanstack/react-router'
import { Smile } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex items-center  justify-center w-full h-screen">
      <Popover>
        <PopoverTrigger>
          <Smile />
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={40}
          className="bg-transparent  border-none shadow-none"
        >
          <Picker data={data} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
