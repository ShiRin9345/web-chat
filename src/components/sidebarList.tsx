import { Route } from '@/routes/(main)/route.tsx'

const SidebarList = () => {
  const groups = Route.useLoaderData()
  return (
    <>
      {groups?.map((group) => (
        <div key={group.id} className="w-full h-5">
          {group.name}
        </div>
      ))}
    </>
  )
}
export default SidebarList
