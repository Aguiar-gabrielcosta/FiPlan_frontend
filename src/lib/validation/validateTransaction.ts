import { NewTransactionSchema } from './schema'

// Função de validação do formulário de transação
export function validateNewTransaction(formData: FormData) {
  const parsedData = NewTransactionSchema.safeParse({
    planId: formData.get('planId'),
    categoryId: formData.get('categoryId'),
    transactionValue: formData.get('transactionValue'),
    transactionType: formData.get('transactionType'),
  })

  return parsedData
}
