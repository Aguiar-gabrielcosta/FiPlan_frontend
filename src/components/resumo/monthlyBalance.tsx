import formatValue from '@/src/lib/utils/formatValue'
import Section from '../section'
import { fetchMonthlyBalance } from '@/src/lib/service/apiConsumer'

export default async function MonthlyBalance() {
  const balance = await fetchMonthlyBalance()

  return (
    <Section width="full" title="Balanço Mensal">
      <div className="flex gap-2">
        <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardGreen p-2">
          <h4 className="font-medium text-primaryDR">Receita</h4>
          <p className="w-40 text-xl font-bold text-primaryDR">
            {formatValue(balance.month_income)}
          </p>
        </div>
        <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardRed p-2">
          <h4 className="font-medium text-primaryDR">Gastos</h4>
          <p className="w-40 text-xl font-bold text-primaryDR">
            {formatValue(balance.month_expense)}
          </p>
        </div>
      </div>
    </Section>
  )
}
