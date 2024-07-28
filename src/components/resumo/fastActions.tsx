import { CircleDollarSign, Package, Route } from 'lucide-react'
import Section from '../global/section'

import Link from 'next/link'

export default function FastActions() {
  return (
    <Section width="fit" title="Acesso Rápido">
      <div className="flex h-full gap-2">
        <Link
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-primaryD p-1 font-medium text-neutralWhite hover:bg-primary"
          href={'resumo/planejamento/plano'}
        >
          <Route width={48} height={40} />
          <p className="w-[100px] text-center">+ Plano</p>
        </Link>
        <Link
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-primaryD p-1 font-medium text-neutralWhite hover:bg-primary"
          href={'resumo/planejamento/categoria'}
        >
          <Package width={40} height={40} />
          <p className="w-[100px] text-center">+ Categoria</p>
        </Link>
        <Link
          className="flex flex-col items-center justify-center gap-1 rounded-lg bg-primaryD p-1 font-medium text-neutralWhite hover:bg-primary"
          href={'resumo/planejamento/transacao'}
        >
          <CircleDollarSign width={40} height={40} />
          <p className="w-[100px] text-center">+ Transação</p>
        </Link>
      </div>
    </Section>
  )
}
