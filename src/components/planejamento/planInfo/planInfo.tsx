import Section from '../../global/section'
import { Api } from '@/src/lib/service/api'
import PlanInfoTable from './planInfoTable'
import PlanCategoriesInfo from './planCategoriesInfo'

export default async function PlanInfo({ planId }: { planId: string }) {
  const planProgress = await Api.planProgress(planId)
  const categories = await Api.expensesPerCategory(planId)

  if (!planProgress.data) {
    return (
      <p className="mt-8 h-full text-center text-lg font-medium text-alertRed">
        {planProgress.message}
      </p>
    )
  }

  if (!categories.data) {
    return (
      <p className="mt-8 h-full text-center text-lg font-medium text-alertRed">
        {categories.message}
      </p>
    )
  }

  return (
    <>
      <Section width="full">
        <PlanInfoTable data={planProgress.data} />
      </Section>
      <Section width="full">
        <PlanCategoriesInfo data={categories.data} />
      </Section>
    </>
  )
}
