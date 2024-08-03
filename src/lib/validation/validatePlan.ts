import { NewPlanSchema } from './schema'

export function validatePlan(formData: FormData) {
  const category = formData.getAll('category')
  const categoryBudget = formData.getAll('categoryBudget')

  const categories = category.map((category, index) => {
    return {
      category,
      categoryBudget: categoryBudget[index],
    }
  })

  const parsedData = NewPlanSchema.safeParse({
    budgetValue: formData.get('budgetValue'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    categories,
  })

  console.log(categories)

  return parsedData
}
