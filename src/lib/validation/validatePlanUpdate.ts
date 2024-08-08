import { UpdatePlanSchema } from './schema'

export function validatePlanUpdate(formData: FormData) {
  const parsedData = UpdatePlanSchema.safeParse({
    budgetValue: formData.get('budgetValue'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  })

  return parsedData
}
