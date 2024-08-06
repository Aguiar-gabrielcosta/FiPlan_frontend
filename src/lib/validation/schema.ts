import { z } from 'zod'
import adjustToUTC from '../utils/adjustToUTC'

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

export const NewCategorySchema = z.object({
  planId: z.string({ invalid_type_error: 'Por favor, selecione um plano.' }),
  category: z
    .string({
      invalid_type_error: 'Por favor, insira um nome para a categoria.',
    })
    .min(1, { message: 'Por favor, insira um nome para a categoria.' })
    .max(50, { message: 'Deve conter no máximo 50 caracteres.' }),
  categoryBudget: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
})

export const UpdateCategorySchema = NewCategorySchema.omit({ planId: true })

export const NewPlanSchema = z.object({
  budgetValue: z.coerce
    .number()
    .gt(0, 'Por favor, insira um valor maior que R$ 0.'),
  startDate: z
    .string()
    .transform((dateStr) => adjustToUTC(dateStr))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Por favor, insira uma data de início para o plano.',
    })
    .transform((date) => {
      return date.toISOString()
    }),
  endDate: z
    .string()
    .transform((dateStr) => adjustToUTC(dateStr))
    .refine((date) => !isNaN(date.getTime()), {
      message: 'Por favor, insira uma data de início para o plano.',
    })
    .transform((date) => {
      return date.toISOString()
    }),
  categories: z.array(NewCategorySchema.omit({ planId: true })),
})

export const UpdatePlanSchema = NewPlanSchema.omit({ categories: true })
