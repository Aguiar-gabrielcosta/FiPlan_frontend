import { PlanProgress } from '@/src/lib/definitions'
import formatValue from '@/src/lib/utils/formatValue'

export default function PlanInfoTable({ data }: { data: PlanProgress }) {
  return (
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
          <td className="truncate p-2">{(data.progress * 100).toFixed(0)}%</td>
          <td className="truncate p-2">
            {formatValue(data.budget_value - data.total_expenses)}
          </td>
          <td className="truncate p-2">
            {new Date(data.start_date).toLocaleDateString('pt-br', {
              month: '2-digit',
              year: '2-digit',
            })}
          </td>
          <td className="truncate p-2">
            {new Date(data.end_date).toLocaleDateString('pt-br', {
              month: '2-digit',
              year: '2-digit',
            })}
          </td>
          <td className="truncate p-2">
            <button></button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}