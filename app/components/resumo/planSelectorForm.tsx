'use client'

export type Plan = {
  budgetId: string
  startDate: string
  endDate: string
}

type Props = {
  data: Plan[]
}

export default function PlanSelectorForm({ data }: Props) {
  return (
    <form action="" id="dashboardPlan">
      <select
        form="dashboardPlan"
        className="rounded-lg border border-primaryDR p-2"
        aria-label="Selecione o período de análise"
      >
        {data.map((plan) => {
          return (
            <option key={plan.budgetId} value={plan.budgetId}>
              {`${plan.startDate} até ${plan.endDate}`}
            </option>
          )
        })}
      </select>
    </form>
  )
}
