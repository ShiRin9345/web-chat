import { Loader } from 'lucide-react'

const PendingPage = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  )
}
export default PendingPage
