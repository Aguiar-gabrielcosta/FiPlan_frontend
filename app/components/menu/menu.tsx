import Image from 'next/image'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import MenuNav from './menuNav'

export default async function Menu() {
  return (
    <div className="flex w-[260px] flex-col p-2">
      <header className="rounded-lg bg-primaryDR p-2 text-neutralWhite">
        <div className="mb-4 flex flex-col items-center gap-2 p-2">
          <Image src={'/avatar.svg'} width={80} height={80} alt={'user.name'} />
          <h2 className="text-xl font-medium">Nome de Usuário</h2>
        </div>
        <div className="flex justify-end gap-1 font-displayFont leading-[19px] text-primaryLR">
          <Image src={'/logo-64.svg'} width={16} height={16} alt="FiPlan" />
          FiPlan
        </div>
      </header>
      <nav className="flex h-full flex-col justify-between">
        <div>
          <MenuNav />
        </div>
        <Link
          href={'/'}
          className="flex justify-center rounded-lg bg-primaryDR py-4 text-neutralWhite transition-all hover:bg-opacity-80"
        >
          <div className="flex gap-1">
            Sair
            <LogOut />
          </div>
        </Link>
      </nav>
    </div>
  )
}
