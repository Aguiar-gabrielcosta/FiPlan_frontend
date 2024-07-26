import { z } from 'zod'

export const NewPlanSchema = z.object({
  budgetValue: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  startDate: z.string().date('Por favor, adicione uma data de início.'),
  endDate: z.string().date('Por favor, adicione uma data de fim.'),
})

export const NewCategorySchema = z.object({
  planId: z.string({
    invalid_type_error: 'Por favor, selecione um plano ou crie um novo.',
  }),
  category: z.string({
    invalid_type_error: 'Por favor, dê um nome à nova categoria.',
  }),
  categoryBudget: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
})

export const NewTransactionSchema = z.object({
  categoryId: z.coerce.number({
    invalid_type_error: 'Por favor, selecione uma categoria ou crie uma nova.',
  }),
  transactionValue: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  transactionType: z.enum(['expense', 'income'], {
    invalid_type_error: 'Por favor, selecione um tipo de gasto.',
  }),
})

export const NewCategoryTransactionSchema = z.object({
  planId: z.string({
    invalid_type_error: 'Por favor, selecione um plano ou crie um novo.',
  }),
  category: z.string({
    invalid_type_error: 'Por favor, selecione uma categoria ou crie uma nova.',
  }),
  categoryBudget: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  transactionValue: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  transactionType: z.enum(['expense', 'income'], {
    invalid_type_error: 'Por favor, selecione um tipo de gasto.',
  }),
})

export const NewPlanCategoryTransactionSchema = z.object({
  budgetValue: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  startDate: z.string().date('Por favor, adicione uma data de início.'),
  endDate: z.string().date('Por favor, adicione uma data de fim.'),
  category: z.string({
    invalid_type_error: 'Por favor, insira um nome para a nova categoria.',
  }),
  categoryBudget: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  transactionValue: z.coerce
    .number()
    .gt(0, { message: 'Por favor, insira um valor maior que R$ 0.' }),
  transactionType: z.enum(['expense', 'income'], {
    invalid_type_error: 'Por favor, selecione um tipo de gasto.',
  }),
})

export const FormSchema = z
  .object({
    planId: z.string().nullable(),
    categoryId: z.coerce.number().nullable(),
    form: z.union([
      NewPlanCategoryTransactionSchema,
      NewCategoryTransactionSchema,
      NewTransactionSchema,
    ]),
  })
  .refine(
    (data) => {
      const { planId, categoryId, form } = data

      if (planId === null) {
        return NewPlanCategoryTransactionSchema.safeParse(form).success
      }

      if (categoryId === null) {
        return NewCategoryTransactionSchema.safeParse(form).success
      }

      return NewTransactionSchema.safeParse(form).success
    },
    {
      message: 'Dados do formulário inválidos',
      path: ['form'],
    },
  )
