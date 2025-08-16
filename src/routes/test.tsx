import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm()
  return <div>Hello "/test"!</div>
}
