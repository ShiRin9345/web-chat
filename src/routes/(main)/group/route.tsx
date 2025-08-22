import { createFileRoute, Outlet, useParams } from '@tanstack/react-router'
import DropProvider from '@/providers/dropProvider.tsx'

export const Route = createFileRoute('/(main)/group')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  return (
    <DropProvider groupId={groupId}>
      <Outlet />
    </DropProvider>
  )
}
