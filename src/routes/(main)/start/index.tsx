import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/start/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello world</div>
}
