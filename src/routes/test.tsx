import { createFileRoute } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge.tsx'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Badge
        className="w-fit rounded-full bg-emerald-500 text-white"
        variant="secondary"
      >
        Online
      </Badge>
    </>
  )
}
