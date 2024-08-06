import EditPlanForm from '@/src/components/planejamento/forms/editPlanForm'
import { Api } from '@/src/lib/service/api'

export default async function EditPlan({ params }: { params: { id: string } }) {
  const planId = params.id

  const plan = await Api.planById(planId)

  if (!plan.data) {
    return (
      <p className="mx-auto mt-32 text-center text-lg font-medium text-alertRed">
        {plan.message}
      </p>
    )
  }

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <EditPlanForm plan={plan.data} />
    </div>
  )
}
