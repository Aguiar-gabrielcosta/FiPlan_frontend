import { fetchPlans } from '@/src/lib/service/apiConsumer'
import SelectorBar from '../../global/optionsBar'
import PlanSelectorForm from './planSelectorForm'

export default async function PlanSelector() {
  const plans = await fetchPlans()

  if (!plans.data) {
    return (
      <SelectorBar title="Período de análise">
        <>
          {plans.message && (
            <p className="text-center text-alertRed">{plans.message}</p>
          )}
        </>
      </SelectorBar>
    )
  }

  return (
    <SelectorBar title="Período de análise">
      <PlanSelectorForm data={plans.data} />
    </SelectorBar>
  )
}
