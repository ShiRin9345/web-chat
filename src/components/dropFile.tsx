import { ImagePlus } from 'lucide-react'
import { useContext } from 'react'
import { DropContext } from '@/providers/dropProvider.tsx'
import { cn } from '@/lib/utils.ts'

const DropFile = () => {
  const isDragActive = useContext(DropContext)
  return (
    <div
      className={cn(
        'absolute inset-0 transition-all opacity-100 duration-500 bg-transparent backdrop-blur-lg z-50 pointer-events-none overflow-hidden',
        !isDragActive && 'opacity-0',
      )}
    >
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[35rem] h-[13rem] bg-white dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg gap-2 py-4">
        <ImagePlus className="text-gray-600 dark:text-gray-400" />
        <p className="font-semibold text-gray-900 dark:text-white">Drag and drop your file here.</p>
      </div>
    </div>
  )
}
export default DropFile
