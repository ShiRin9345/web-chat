const Sidebar = () => {
  const icon = ['hello', 'no', 'good']
  return (
    <aside className="fixed top-0 left-0 flex h-full w-16 flex-col border-r shadow-2xs">
      {icon.map((ic) => (
        <div key={ic}>{ic}</div>
      ))}
    </aside>
  )
}

export default Sidebar
