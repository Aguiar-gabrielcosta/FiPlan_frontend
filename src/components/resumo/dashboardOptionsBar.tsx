import OptionsBar from '../global/optionsBar'
import PlanSelect from '../global/planSelect'
import { Api } from '@/src/lib/service/api'

export default async function DashboardOptionsBar() {
  const plans = await Api.plans()

  if (!plans.data) {
    return (
      <OptionsBar title="Período de análise">
        <>
          {plans.message && (
            <p className="text-center text-alertRed">{plans.message}</p>
          )}
        </>
      </OptionsBar>
    )
  }

  return (
    <OptionsBar title="Período de análise">
      <PlanSelect data={plans.data} />
    </OptionsBar>
  )
}
