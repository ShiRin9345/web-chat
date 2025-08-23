import { Plus } from 'lucide-react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import NewGroupForm from '@/components/newGroupForm.tsx'

const GroupAddIcon = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ToolTipIcon content="create new group">
          <Plus className="text-emerald-500" />
        </ToolTipIcon>
      </DialogTrigger>
      <DialogContent>
        <NewGroupForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
export default GroupAddIcon

export function ToolTipIcon({
  content,
  children,
}: {
  content: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-zinc-100 cursor-pointer hover:bg-zinc-200 size-12 rounded-full flex items-center transition duration-300 hover:rounded-2xl justify-center ">
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" align="center">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}
