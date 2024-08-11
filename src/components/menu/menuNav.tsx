'use client'

import { logout } from '@/src/lib/actions'
import { History, LogOut, NotebookText, Route } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Resumo', icon: <NotebookText />, href: '/resumo' },
  {
    label: 'Planejamentos',
    icon: <Route />,
    href: '/resumo/planejamento',
  },
  { label: 'Histórico', icon: <History />, href: '/resumo/historico' },
]

export default function MenuNav() {
  const pathname = usePathname()

  return (
    <>
      <ul className="flex flex-col gap-2 p-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={`flex gap-1 rounded-lg border border-primaryD px-4 py-2 font-medium transition-all duration-500 hover:border-primaryD hover:bg-primaryD hover:text-neutralWhite ${link.href === pathname ? 'bg-primaryD text-neutralWhite' : 'bg-bgL text-primaryDR'}`}
            >
              <div className="flex gap-1">
                {link.label}
                {link.icon}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="flex justify-center gap-1 rounded-lg bg-primaryDR py-4 text-neutralWhite transition-all hover:bg-opacity-80"
        onClick={() => logout()}
      >
        Sair
        <LogOut />
      </button>
    </>
  )
}
