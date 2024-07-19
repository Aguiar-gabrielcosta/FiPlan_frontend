'use client'

import SelectorBar from '../selectorBar'

const data = [
  {
    planId: 1,
    startDate: new Date().toLocaleDateString(),
    endDate: '18/08/2024',
  },
  {
    planId: 2,
    startDate: new Date().toLocaleDateString(),
    endDate: '18/09/2024',
  },
  {
    planId: 3,
    startDate: new Date().toLocaleDateString(),
    endDate: '18/10/2024',
  },
  {
    planId: 4,
    startDate: new Date().toLocaleDateString(),
    endDate: '18/11/2024',
  },
  {
    planId: 5,
    startDate: new Date().toLocaleDateString(),
    endDate: '18/12/2024',
  },
]

export default function PlanSelector() {
  return (
    <SelectorBar title="Período de análise">
      <form action="" id="dashboardPlan">
        <select
          form="dashboardPlan"
          className="rounded-lg border border-primaryDR p-2"
        >
          {data.map((plan) => {
            return (
              <option key={plan.planId} value={plan.planId}>
                {`${plan.startDate} até ${plan.endDate}`}
              </option>
            )
          })}
        </select>
      </form>
    </SelectorBar>
  )
}
