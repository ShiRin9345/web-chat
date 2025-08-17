import { createFileRoute } from '@tanstack/react-router'
import { useDropzone } from 'react-dropzone'

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
    <div
      {...getRootProps()}
      className="h-dvh w-full flex items-center justify-center"
    >
      {isDragActive && <span>Dragging</span>}
    </div>
  )
}
