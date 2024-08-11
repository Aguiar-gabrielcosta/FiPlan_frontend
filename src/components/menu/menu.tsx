import Image from 'next/image'
import MenuNav from './menuNav'
import { getSessionData } from '@/src/lib/utils/sessionUtils'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default async function Menu() {
  return (
    <div className="flex w-[260px] flex-shrink-0 flex-col p-2">
      <header className="rounded-lg bg-primaryDR p-2 text-neutralWhite">
        <div className="mb-4 flex flex-col items-center gap-2 p-2">
          <Image src={'/avatar.svg'} width={80} height={80} alt={'usuário'} />
          <Suspense fallback={<Loader2 className="animate-spin" />}>
            <UsernameField />
          </Suspense>
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

async function UsernameField() {
  const session = await getSessionData()
  const username = String(session?.username)

  return (
    <h2 className="w-48 truncate text-center text-xl font-medium capitalize">
      {username}
    </h2>
  )
}
