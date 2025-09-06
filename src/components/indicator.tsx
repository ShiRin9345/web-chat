import { useSocket } from '@/providers/socketProvider.tsx'
import {
  Status,
  StatusIndicator,
  StatusLabel,
} from '@/components/ui/shadcn-io/status'

const Indicator = () => {
  const { isConnected } = useSocket()
  return (
    <Status status={`${isConnected ? 'online' : 'offline'}`}>
      <StatusLabel />
      <StatusIndicator />
    </Status>
  )
}
export default Indicator
