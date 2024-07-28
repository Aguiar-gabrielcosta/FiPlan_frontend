import { fetchPlans } from '@/src/lib/service/apiConsumer'
import SelectorBar from '../../global/optionsBar'
import PlanSelectorForm from './planSelectorForm'

export default async function PlanSelector() {
  const plans = await fetchPlans()

  return (
    <SelectorBar title="Período de análise">
      <PlanSelectorForm data={plans} />
    </SelectorBar>
  )
}
