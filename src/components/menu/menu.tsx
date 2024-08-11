import Image from 'next/image'
import MenuNav from './menuNav'

export default function Menu() {
  return (
    <div className="flex w-[260px] flex-shrink-0 flex-col p-2">
      <header className="rounded-lg bg-primaryDR p-2 text-neutralWhite">
        <div className="mb-4 flex flex-col items-center gap-2 p-2">
          <Image src={'/avatar.svg'} width={80} height={80} alt={'user.name'} />
          <h2 className="text-xl font-medium">Nome de Usuário</h2>
        </div>
        <div className="flex justify-end gap-1 font-displayFont leading-[19px] text-primaryLR">
          <Image src={'/logo-64.svg'} width={16} height={16} alt="FiPlan" />
          <h1>FiPlan</h1>
        </div>
      </header>
      <nav className="flex h-full flex-col justify-between">
        <MenuNav />
      </nav>
    </div>
  )
}
