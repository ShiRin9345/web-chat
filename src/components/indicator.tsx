import { Badge } from '@/components/ui/badge.tsx'
import { useSocket } from '@/providers/socketProvider.tsx'
import { cn } from '@/lib/utils.ts'

const Indicator = () => {
  const { isConnected } = useSocket()
  return (
    <Badge
      className={cn(
        'w-fit rounded-full text-xs text-white',
        isConnected ? 'bg-emerald-500' : 'bg-amber-500',
      )}
      variant={cn(isConnected ? 'destructive' : 'secondary')}
    >
      {isConnected ? '在线' : '离线'}
    </Badge>
  )
}
export default Indicator
