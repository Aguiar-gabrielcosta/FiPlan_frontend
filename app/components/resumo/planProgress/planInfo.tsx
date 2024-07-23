import formatValue from '@/app/lib/utils/formatValue'
import Section from '../../section'
import BudgetChart from './budgetChart'

const dataPH = {
  totaBudget: 10000,
  totalExpenses: 5110,
  totalPercentage: 0.51,
  timeFrame: 'jul/24',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function planInfo({ planId }: { planId: string }) {
  const displayData = (): { header: string; value: string }[] => {
    return [
      {
        header: `Orçamento - ${dataPH.timeFrame}`,
        value: formatValue(dataPH.totaBudget),
      },
      {
        header: `Gastos - ${dataPH.timeFrame}`,
        value: formatValue(dataPH.totalExpenses),
      },
    ]
  }

  return (
    <Section title="Meta atual" width="fit">
      <div className="flex flex-col items-center gap-2 px-4 py-2">
        <BudgetChart percentage={dataPH.totalPercentage} acceptable={0.7} />
        {displayData().map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 p-2">
            <h4 className="font-medium text-primaryDR">{item.header}</h4>
            <span className="font-bold text-primaryDR">{item.value}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
