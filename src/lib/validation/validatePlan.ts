import { NewPlanSchema } from './schema'

export function validatePlan(formData: FormData) {
  const parsedData = NewPlanSchema.safeParse({
    budgetValue: formData.get('budgetValue'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  })

  return parsedData
}
