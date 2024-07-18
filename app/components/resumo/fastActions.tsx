import { CircleMinus, CirclePlus } from 'lucide-react'
import Section from '../section'

export default function FastActions() {
  return (
    <Section width="fit" title="Acesso Rápido">
      <div className="flex h-full gap-2">
        <button className="flex items-center gap-1 rounded-lg border border-primaryDR p-2 font-medium text-alertPositive">
          <CirclePlus width={48} height={48} />
          <p className="w-[100px]">Adicionar Receita</p>
        </button>
        <button className="flex items-center gap-1 rounded-lg border border-primaryDR p-2 font-medium text-alertNegative">
          <CircleMinus width={48} height={48} />
          <p className="w-[100px]">Adicionar Gasto</p>
        </button>
      </div>
    </Section>
  )
}
