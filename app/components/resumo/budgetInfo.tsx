import formatValue from '@/app/utils/formatValue'
import Section from '../section'
import BudgetChart from './budgetChart'

const data = {
  totaBudget: 10000,
  totalExpenses: 5110,
  totalPercentage: 0.51,
  timeFrame: 'jul/24',
}

export default async function BudgetInfo() {
  const formatedData = (): { header: string; value: string }[] => {
    return [
      {
        header: `Orçamento - ${data.timeFrame}`,
        value: formatValue(data.totaBudget),
      },
      {
        header: `Gastos - ${data.timeFrame}`,
        value: formatValue(data.totalExpenses),
      },
    ]
  }

  return (
    <Section title="Meta atual" width="fit">
      <div className="flex flex-col items-center gap-2 px-4 py-2">
        <BudgetChart percentage={data.totalPercentage} acceptable={0.7} />
        {formatedData().map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 p-2">
            <h4 className="font-medium text-primaryDR">{item.header}</h4>
            <span className="font-bold text-primaryDR">{item.value}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
