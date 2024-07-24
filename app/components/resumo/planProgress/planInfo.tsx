import formatValue from '@/app/lib/utils/formatValue'
import Section from '../../section'
import BudgetChart from './budgetChart'
import { fecthPlanProgress } from '@/app/lib/service/apiConsumer'

// const dataPH = {
//   totaBudget: 10000,
//   totalExpenses: 5110,
//   totalPercentage: 0.51,
//   timeFrame: 'jul/24',
// }

export default async function planInfo({ planId }: { planId: string }) {
  const planProgress = await fecthPlanProgress(planId)

  const displayData = (): { header: string; value: string }[] => {
    const month = new Date(planProgress.start_date).getMonth()
    const year = new Date(planProgress.start_date).getFullYear()

    return [
      {
        header: `Orçamento - ${month}/${year}`,
        value: formatValue(planProgress.budget_value),
      },
      {
        header: `Gastos - ${month}/${year}`,
        value: formatValue(planProgress.total_expenses),
      },
    ]
  }

  return (
    <Section title="Meta atual" width="fit">
      <div className="flex flex-col items-center gap-2 px-4 py-2">
        <BudgetChart percentage={planProgress.progress} acceptable={0.7} />
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
