'use client'

import { deleteCategory } from '@/src/lib/actions'
import { CategoriesProgress } from '@/src/lib/definitions'
import formatValue from '@/src/lib/utils/formatValue'
import { Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function PlanCategoriesInfo({
  data,
}: {
  data: CategoriesProgress[]
}) {
  const [deleteError, setDeleteError] = useState<string>()

  const categoryDeleteAction = async (categoryId: number) => {
    const response = await deleteCategory(categoryId)

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
            <th scope="col" className="w-40 truncate p-2">
              Categoria
            </th>
            <th scope="col" className="w-32 truncate p-2">
              Orçamento
            </th>
            <th scope="col" className="w-32 truncate p-2">
              Gasto
            </th>
            <th scope="col" className="w-16 truncate p-2">
              %Gasto
            </th>
            <th scope="col" className="w-32 truncate p-2">
              Restante
            </th>
            <th scope="col" className="w-28 truncate p-2"></th>
          </tr>
        </thead>
        <tbody className="border-y border-primaryLR">
          {data.map((category) => {
            return (
              <tr
                key={category.category_id}
                className="border-b border-primaryLR text-primaryDR"
              >
                <td className="truncate p-2">{category.category}</td>
                <td className="truncate p-2">
                  {formatValue(category.category_budget)}
                </td>
                <td className="truncate p-2">
                  {formatValue(category.total_expenses)}
                </td>
                <td className="truncate p-2">
                  {(category.progress * 100).toFixed(0)}%
                </td>
                <td className="truncate p-2">
                  {formatValue(
                    category.category_budget - category.total_expenses,
                  )}
                </td>
                <td className="flex justify-end gap-2 truncate p-2">
                  <Link
                    href={`/resumo/planejamento/${category.category_id}/categoria`}
                    title="Clique para editar a categoria"
                    className="rounded-lg border border-primaryD bg-transparent p-1 text-primaryD transition-all hover:bg-primaryLR"
                  >
                    <Edit2 />
                  </Link>
                  <button
                    type="button"
                    title="Clique para excluir a categoria"
                    className="bg-trasnsparent rounded-lg border border-primaryD p-1 text-primaryD transition-all hover:bg-primaryLR"
                    onClick={() => categoryDeleteAction(category.category_id)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            )
          })}
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
