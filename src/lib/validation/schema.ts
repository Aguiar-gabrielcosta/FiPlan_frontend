import { z } from 'zod'

// Esquema de validação do formulário de nova transação
export const NewTransactionSchema = z.object({
  planId: z.string({ invalid_type_error: 'Por favor, selecione um plano.' }),
  categoryId: z.coerce
    .number({
      invalid_type_error: 'Por favor, selecione uma categoria.',
    })
    .gt(0, { message: 'Por favor, selecione uma categoria.' }),
  transactionValue: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  transactionType: z.enum(['expense', 'income'], {
    invalid_type_error: 'Por favor, selecione um tipo de gasto.',
  }),
})
