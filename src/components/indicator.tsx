import { useSocket } from '@/providers/socketProvider.tsx'
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from '@/components/ui/shadcn-io/status'
import { cn } from '@/lib/utils.ts'

const Indicator = () => {
  const { isConnected } = useSocket()
  return (
    // <Badge
    //   className={cn(
    //     'w-fit self-end rounded-full text-[0.6rem] text-white',
    //     isConnected ? 'bg-emerald-500' : 'bg-amber-500',
    //   )}
    //   variant={
    //     cn(isConnected ? 'destructive' : 'secondary') as
    //       | 'destructive'
    //       | 'secondary'
    //   }
    // >
    //   {isConnected ? '在线' : '离线'}
    // </Badge>
    <Status status={`${isConnected ? 'online' : 'offline'}`}>
      <StatusLabel />
      <StatusIndicator />
    </Status>
  )
}
export default Indicator
