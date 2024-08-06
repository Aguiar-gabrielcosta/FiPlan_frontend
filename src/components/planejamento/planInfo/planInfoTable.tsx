'use client'

import { deletePlan } from '@/src/lib/actions'
import { PlanProgress } from '@/src/lib/definitions'
import formatValue from '@/src/lib/utils/formatValue'
import { Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function PlanInfoTable({ data }: { data: PlanProgress }) {
  const [deleteError, setDeleteError] = useState<string>()
  const planId = useSearchParams().get('plan') || ''

  const planDeleteAction = async () => {
    const response = await deletePlan(planId)

    if (response) {
      setDeleteError(response.message)
    } else if (deleteError) {
      setDeleteError(undefined)
    }
  }

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left font-medium text-primaryDR">
            <th scope="col" className="w-32 truncate p-2">
              Plano
            </th>
            <th scope="col" className="w-32 truncate p-2">
              Gastos
            </th>
            <th scope="col" className="w-20 truncate p-2">
              %Gastos
            </th>
            <th scope="col" className="w-32 truncate p-2">
              Restante
            </th>
            <th scope="col" className="w-16 truncate p-2">
              Início
            </th>
            <th scope="col" className="w-16 truncate p-2">
              Fim
            </th>
            <th scope="col" className="w-28 truncate p-2"></th>
          </tr>
        </thead>
        <tbody className="border-y border-primaryLR">
          <tr className="text-primaryDR">
            <td className="truncate p-2">{formatValue(data.budget_value)}</td>
            <td className="truncate p-2">{formatValue(data.total_expenses)}</td>
            <td className="truncate p-2">
              {(data.progress * 100).toFixed(0)}%
            </td>
            <td className="truncate p-2">
              {formatValue(data.budget_value - data.total_expenses)}
            </td>
            <td className="truncate p-2">
              {new Date(data.start_date).toLocaleDateString('pt-br', {
                day: '2-digit',
                month: '2-digit',
              })}
            </td>
            <td className="truncate p-2">
              {new Date(data.end_date).toLocaleDateString('pt-br', {
                day: '2-digit',
                month: '2-digit',
              })}
            </td>
            <td className="flex justify-end gap-2 truncate p-2">
              <Link
                href={`/resumo/planejamento/${planId}/plano`}
                title="Clique para editar o plano"
                className="rounded-lg border border-primaryD bg-transparent p-1 text-primaryD transition-all hover:bg-primaryLR"
              >
                <Edit2 />
              </Link>
              <button
                type="button"
                title="Clique para excluir o plano"
                className="bg-trasnsparent rounded-lg border border-primaryD p-1 text-primaryD transition-all hover:bg-primaryLR"
                onClick={() => planDeleteAction()}
              >
                <Trash2 />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {deleteError && (
        <p className="text m-2 text-center font-medium text-alertRed">
          {deleteError}
        </p>
      )}
    </>
  )
}
