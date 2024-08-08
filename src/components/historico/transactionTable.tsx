'use client'

import { deleteTransaction } from '@/src/lib/actions'
import formatDate from '@/src/lib/utils/formatDate'
import formatValue from '@/src/lib/utils/formatValue'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function TransactionTable({
  transactions,
}: {
  transactions: {
    transaction_id: string
    category: string
    transaction_value: number
    transaction_type: 'expense' | 'income'
    transaction_date: string
  }[]
}) {
  const [deleteError, setDeleteError] = useState<string>()

  const transactionDeleteAction = async (transactionId: string) => {
    const response = await deleteTransaction(transactionId)

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
              Valor
            </th>
            <th scope="col" className="w-16 truncate p-2">
              Tipo
            </th>
            <th scope="col" className="w-20 truncate p-2">
              Data
            </th>
            <th scope="col" className="w-28 truncate p-2"></th>
          </tr>
        </thead>
        <tbody className="border-y border-primaryLR">
          {transactions.map((transaction) => {
            return (
              <tr
                key={transaction.transaction_id}
                className="border-b border-primaryLR text-primaryDR"
              >
                <td className="truncate p-2">{transaction.category}</td>
                <td className="truncate p-2">
                  {formatValue(transaction.transaction_value)}
                </td>
                <td className="truncate p-2">{transaction.transaction_type}</td>
                <td className="truncate p-2">
                  {formatDate(transaction.transaction_date)}
                </td>
                <td className="flex justify-end gap-2 truncate p-2">
                  <button
                    type="button"
                    title="Clique para excluir o plano"
                    className="bg-trasnsparent rounded-lg border border-primaryD p-1 text-primaryD transition-all hover:bg-primaryLR"
                    onClick={() =>
                      transactionDeleteAction(transaction.transaction_id)
                    }
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
