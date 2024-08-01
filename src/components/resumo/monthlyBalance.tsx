import formatValue from '@/src/lib/utils/formatValue'
import Section from '../global/section'
import { fetchMonthlyBalance } from '@/src/lib/service/apiConsumer'

export default async function MonthlyBalance() {
  const balance = await fetchMonthlyBalance()

  if (!balance.data) {
    return (
      <Section width="full" title="Balanço Mensal">
        <div className="flex gap-2">
          <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardGreen p-2">
            <h4 className="font-medium text-primaryDR">Receita</h4>
            <p className="w-40 text-xl font-bold text-primaryDR">
              {formatValue(0)}
            </p>
          </div>
          <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardRed p-2">
            <h4 className="font-medium text-primaryDR">Gastos</h4>
            <p className="w-40 text-xl font-bold text-primaryDR">
              {formatValue(0)}
            </p>
          </div>
        </div>
        {balance.message && (
          <p className="mt-2 text-center text-alertRed">{balance.message}</p>
        )}
      </Section>
    )
  }

  const { month_expense: monthExpense, month_income: monthIncome } =
    balance.data

  return (
    <Section width="full" title="Balanço Mensal">
      <div className="flex gap-2">
        <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardGreen p-2">
          <h4 className="font-medium text-primaryDR">Receita</h4>
          <p className="w-40 text-xl font-bold text-primaryDR">
            {formatValue(monthIncome)}
          </p>
        </div>
        <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardRed p-2">
          <h4 className="font-medium text-primaryDR">Gastos</h4>
          <p className="w-40 text-xl font-bold text-primaryDR">
            {formatValue(monthExpense)}
          </p>
        </div>
      </div>
    </Section>
  )
}
