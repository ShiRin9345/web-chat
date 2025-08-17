import { createFileRoute } from '@tanstack/react-router'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils.ts'

export const Route = createFileRoute('/test2')({
  component: RouteComponent,
})

function RouteComponent() {
  const onDrop = (files: Array<File>) => {
    files.forEach((file) => {
      console.log('文件已接受:', file.name, file.type)
    })
  }

  const { getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    },
    onDrop,
  })
  return (
    <div {...getRootProps()} className="h-dvh relative w-full ">
      <div
        {...getRootProps()}
        className={cn(
          'absolute z-50 transition-all duration-500 inset-0 bg-blue-500',
          !isDragActive && 'invisible opacity-0',
        )}
      >
        <span>Dragging</span>
      </div>
    </div>
  )
}
