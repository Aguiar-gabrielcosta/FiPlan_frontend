import formatValue from '@/app/lib/utils/formatValue'
import Section from '../section'

const data = {
  receita: 10000,
  gastos: 5110,
}

export default async function MonthlyBalance() {
  return (
    <Section width="full" title="Balanço Mensal">
      <div className="flex gap-2">
        <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardGreen p-2">
          <h4 className="font-medium text-primaryDR">Receita</h4>
          <p className="w-40 text-xl font-bold text-primaryDR">
            {formatValue(data.receita)}
          </p>
        </div>
        <div className="flex flex-grow flex-col gap-4 rounded-lg bg-dashboardRed p-2">
          <h4 className="font-medium text-primaryDR">Gastos</h4>
          <p className="w-40 text-xl font-bold text-primaryDR">
            {formatValue(data.gastos)}
          </p>
        </div>
      </div>
    </Section>
  )
}
