import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/group/video/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/video/$groupId' })
  return <div>Hello "/(main)/group/video/"!</div>
}
