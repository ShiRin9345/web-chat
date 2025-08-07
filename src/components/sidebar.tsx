
const Sidebar = () => {
    const icon = ['hello', 'no', 'good']
    return (
        <aside className="h-full fixed w-16 flex top-0 left-0 flex-col border-r shadow-2xs">
            {icon.map(ic => (
                <div key={ic}>{ic}</div>
            ))}
        </aside>
    )
}

export default Sidebar
