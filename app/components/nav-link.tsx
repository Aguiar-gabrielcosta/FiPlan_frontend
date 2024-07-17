import Link from 'next/link'

export default function NavLink({ children }: { children: string }) {
  return <Link href={'/resumo'}>{children}</Link>
}
