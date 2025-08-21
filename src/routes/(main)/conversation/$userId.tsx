import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/conversation/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(main)/conversation/$userId"!</div>
}
