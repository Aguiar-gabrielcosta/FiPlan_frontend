import { FormSchema } from './schema'

export function validateNewTransaction(formData: FormData) {
  const planId = formData.get('planId') || null
  const categoryId = formData.get('categoryId') || null

  let formDataObj

  if (planId === null) {
    // Novo plano, nova categoria e nova transação
    formDataObj = {
      budgetValue: formData.get('budgetValue'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      category: formData.get('category'),
      categoryBudget: formData.get('categoryBudget'),
      transactionValue: formData.get('transactionValue'),
      transactionType: formData.get('transactionType'),
    }
  } else if (categoryId === null) {
    // Nova categoria e nova transação
    formDataObj = {
      planId,
      category: formData.get('category'),
      categoryBudget: formData.get('categoryBudget'),
      transactionValue: formData.get('transactionValue'),
      transactionType: formData.get('transactionType'),
    }
  } else {
    // Nova transação
    formDataObj = {
      categoryId: Number(categoryId),
      transactionValue: formData.get('transactionValue'),
      transactionType: formData.get('transactionType'),
    }
  }

  const parsedData = FormSchema.safeParse({
    planId,
    categoryId: categoryId ? Number(categoryId) : null,
    form: formDataObj,
  })

  return parsedData
}
