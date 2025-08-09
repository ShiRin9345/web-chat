import HeaderUser from '@/integrations/clerk/header.tsx'

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 flex h-full w-16 flex-col border-r shadow-2xs">
      <HeaderUser />
    </aside>
  )
}

export default Sidebar
