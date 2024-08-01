import Menu from '../../components/menu/menu'

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Menu />
      <main className="flex-grow overflow-y-auto p-2">{children}</main>
    </div>
  )
}
