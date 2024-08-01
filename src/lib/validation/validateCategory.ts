import { NewCategorySchema } from './schema'

export function validateCategory(formData: FormData) {
  const parsedData = NewCategorySchema.safeParse({
    planId: formData.get('planId'),
    category: formData.get('category'),
    categoryBudget: formData.get('categoryBudget'),
  })

  return parsedData
}
