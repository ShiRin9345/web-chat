import { createFileRoute } from '@tanstack/react-router'
import { QRCode } from '@/components/ui/shadcn-io/qr-code'

export const Route = createFileRoute('/test1')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <QRCode data="http://192.168.3.37:3000/test1" className="size-[200px]" />
  )
}
