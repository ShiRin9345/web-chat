import { Loader } from 'lucide-react'

const PendingPage = () => {
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <Loader className="animate-spin text-gray-600 dark:text-gray-400" />
    </div>
  )
}
export default PendingPage
