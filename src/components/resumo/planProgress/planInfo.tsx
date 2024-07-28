import { fecthPlanProgress } from '@/src/lib/service/apiConsumer'
import Section from '../../global/section'
import BudgetChart from './budgetChart'
import formatValue from '@/src/lib/utils/formatValue'

export default async function planInfo({ planId }: { planId: string }) {
  const planProgress = await fecthPlanProgress(planId)

  if (!planProgress.data) {
    return (
      <Section title="Meta atual" width="fit">
        <div className="flex flex-col items-center gap-2 px-4 py-2">
          <BudgetChart percentage={0} acceptable={0.7} />
          <div className="flex flex-col items-center gap-2 p-2">
            <h4 className="font-medium text-primaryDR">Orçamento</h4>
            <span className="font-bold text-primaryDR">{formatValue(0)}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <h4 className="font-medium text-primaryDR">Gastos</h4>
            <span className="font-bold text-primaryDR">{formatValue(0)}</span>
          </div>
          {planProgress.message && (
            <p className="mt-2 text-center text-alertRed">
              {planProgress.message}
            </p>
          )}
        </div>
      </Section>
    )
  }

  const {
    budget_value: budgetValue,
    start_date: startDate,
    end_date: endDate,
    progress,
    total_expenses: totalExpenses,
  } = planProgress.data

  const displayData = (): { header: string; value: string }[] => {
    const month = new Date(startDate).getMonth()
    const year = new Date(endDate).getFullYear()

    return [
      {
        header: `Orçamento - ${month}/${year}`,
        value: formatValue(budgetValue),
      },
      {
        header: `Gastos - ${month}/${year}`,
        value: formatValue(totalExpenses),
      },
    ]
  }

  return (
    <Section title="Meta atual" width="fit">
      <div className="flex flex-col items-center gap-2 px-4 py-2">
        <BudgetChart percentage={progress} acceptable={0.7} />
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
