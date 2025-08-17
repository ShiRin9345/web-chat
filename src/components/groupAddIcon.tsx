import { Plus } from 'lucide-react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
        <ToolTipIcon />
      </DialogTrigger>
      <DialogContent>
        <NewGroupForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
export default GroupAddIcon

function ToolTipIcon() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="bg-zinc-100 cursor-pointer hover:bg-zinc-200 size-12 rounded-full flex items-center transition duration-300 hover:rounded-2xl justify-center ">
            <Plus className="text-emerald-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="center">
          <p>create new group</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
