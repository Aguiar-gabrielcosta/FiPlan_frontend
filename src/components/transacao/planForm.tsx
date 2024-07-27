import { SendHorizonal, X } from 'lucide-react'
import Link from 'next/link'

export default function PlanForm() {
  return (
    <form action="" id="transactionForm">
      <div className="flex w-[452px] flex-col justify-between gap-8 rounded-lg bg-neutralWhite p-4 drop-shadow-md">
        <div className="flex flex-col gap-4 rounded-lg bg-bgL p-4">
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 font-medium text-primaryDR">Plano</legend>
            {/* Formulário para adicionar novo plano */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="budgetValue"
                  className="font-medium text-primaryDR"
                >
                  Orçamento
                </label>
                <input
                  type="number"
                  name="budgetValue"
                  id="budgetValue"
                  placeholder="Insira o orçamento do plano"
                  className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                  min={0}
                  step={0.01}
                />
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="startDate"
                  className="font-medium text-primaryDR"
                >
                  Data de início
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  placeholder="Insira a data de início"
                  className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="endDate" className="font-medium text-primaryDR">
                  Data do fim
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  placeholder="Insira a data do fim"
                  className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Link
            role="button"
            className="flex items-center gap-2 rounded-lg bg-primaryDR px-2 py-1 text-neutralWhite"
            href={'/resumo/planejamento'}
          >
            <X size={20} />
            Cancelar
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1 text-neutralWhite"
            disabled={true}
          >
            <SendHorizonal size={20} />
            Enviar
          </button>
        </div>
      </div>
    </form>
  )
}
