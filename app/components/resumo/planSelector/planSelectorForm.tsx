'use client'

import { Plan } from '@/app/lib/definitions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  data: Plan[]
}

export default function PlanSelectorForm({ data }: Props) {
  const urlParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  function selectPlan(planId: string) {
    const params = new URLSearchParams(urlParams)

    if (planId) {
      params.set('plan', planId)
    } else {
      params.delete('plan')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form action="" id="dashboardPlan">
      <select
        form="dashboardPlan"
        className="rounded-lg border border-primaryDR p-2"
        aria-label="Selecione o período de análise"
        onChange={(e) => selectPlan(e.currentTarget.value)}
      >
        <option value="">Selecione um plano</option>
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
