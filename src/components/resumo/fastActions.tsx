import { CircleMinus, CirclePlus } from 'lucide-react'
import Section from '../section'

import Link from 'next/link'

export default function FastActions() {
  return (
    <Section width="fit" title="Acesso Rápido">
      <div className="flex h-full gap-2">
        <Link
          className="flex items-center gap-1 rounded-lg border border-primaryDR p-2 font-medium text-alertGreen"
          href={'resumo/planejamento/transacao'}
        >
          <CirclePlus width={48} height={48} />
          <p className="w-[100px] text-center">Adicionar Receita</p>
        </Link>
        <Link
          className="flex items-center gap-1 rounded-lg border border-primaryDR p-2 font-medium text-alertRed"
          href={'resumo/planejamento/transacao'}
        >
          <CircleMinus width={48} height={48} />
          <p className="w-[100px] text-center">Adicionar Gasto</p>
        </Link>
      </div>
    </Section>
  )
}
