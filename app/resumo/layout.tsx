import Menu from '../components/menu'

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen gap-2 p-2">
      <Menu />
      <main>{children}</main>
    </div>
  )
}
