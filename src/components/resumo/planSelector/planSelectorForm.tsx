'use client'

import { Plan } from '@/src/lib/definitions'
import formatDate from '@/src/lib/utils/formatDate'
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
        className="cursor-pointer rounded-lg border border-primaryDR p-2"
        aria-label="Selecione o período de análise"
        value={urlParams.get('plan') || ''}
        onChange={(e) => selectPlan(e.currentTarget.value)}
      >
        <option value="" disabled>
          Selecione um plano
        </option>
        {data.map((plan) => {
          return (
            <option key={plan.plan_id} value={plan.plan_id}>
              {`${formatDate(plan.start_date)} até ${formatDate(plan.end_date)}`}
            </option>
          )
        })}
      </select>
    </form>
  )
}
