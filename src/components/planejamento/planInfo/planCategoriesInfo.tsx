import { ExpensesPerCategory } from '@/src/lib/definitions'
import formatValue from '@/src/lib/utils/formatValue'

export default function PlanCategoriesInfo({
  data,
}: {
  data: ExpensesPerCategory[]
}) {
  return (
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
              key={category.category}
              className="border-b border-primaryLR text-primaryDR"
            >
              <td className="truncate p-2">{category.category}</td>
              <td className="truncate p-2">
                {formatValue(category.category_budget)}
              </td>
              <td className="truncate p-2">{formatValue(category.expenses)}</td>
              <td className="truncate p-2">
                {(category.progress * 100).toFixed(0)}%
              </td>
              <td className="truncate p-2">
                {formatValue(category.category_budget - category.expenses)}
              </td>
              <td className="truncate p-2"></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
