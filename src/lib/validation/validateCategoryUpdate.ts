import { UpdateCategorySchema } from './schema'

export function validateCategoryUpdate(formData: FormData) {
  const parsedData = UpdateCategorySchema.safeParse({
    category: formData.get('category'),
    categoryBudget: formData.get('categoryBudget'),
  })

  return parsedData
}
