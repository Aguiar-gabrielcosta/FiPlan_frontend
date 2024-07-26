'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { Api } from './service/api'

const apiBaseURL = process.env.API_URL
const userId = process.env.TEST_USER

const FormSchema = z.object({
  userId: z.string(),
  transactionId: z.string(),
  transactionValue: z.coerce.number(),
  transactionType: z.enum(['expense', 'income']),
  transactionDate: z.string(),
  categoryId: z.number().optional().nullable(),
  category: z.string(),
  categoryBudget: z.coerce.number(),
  planId: z.string().optional().nullable(),
  budgetValue: z.coerce.number(),
  startDate: z.string(),
  endDate: z.string(),
})

const NewTransaction = FormSchema.omit({
  userId: true,
  transactionId: true,
  transactionDate: true,
})

export async function newTransaction(formData: FormData) {
  const parsedData = NewTransaction.safeParse({
    transactionValue: formData.get('transactionValue'),
    transactionType: formData.get('transactionType'),
    planId: formData.get('planId'),
    budgetValue: formData.get('budgetValue'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    categoryId: formData.get('categoryId'),
    category: formData.get('category'),
    categoryBudget: formData.get('categoryBudget'),
  })

  if (!parsedData.success) {
    throw Error('Invalid Data.\n' + parsedData.error)
  }

  const {
    budgetValue,
    category,
    categoryBudget,
    endDate,
    startDate,
    transactionType,
    transactionValue,
    categoryId,
    planId,
  } = parsedData.data

  // Se houver um plano e uma categoria já cadastrada, apenas envia os dados da transação
  if (planId && categoryId) {
    try {
      await fetch(`${apiBaseURL}/transaction/data`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          category_id: categoryId,
          transaction_type: transactionType,
          transaction_value: transactionValue,
          transaction_date: new Date().toISOString(),
        }),
      })

      console.log('New transaction added in existing plan and category')
    } catch (error) {
      console.log(error)
      throw new Error('Failed to add new transaction')
    }
  }

  // Se houver um plano mas utilizando uma nova categoria, primeiro deve-se adicionar a categoria
  if (planId && !category) {
    try {
      const newCategory = await fetch(`${apiBaseURL}/plan/data`, {
        method: 'POST',
        body: JSON.stringify({
          plan_id: planId,
          category,
          category_budget: categoryBudget,
        }),
      })

      const { newCategoryId } = await newCategory.json()

      console.log('New category added.')

      try {
        await fetch(`${apiBaseURL}/transaction/data`, {
          method: 'POST',
          body: JSON.stringify({
            userId,
            category_id: newCategoryId,
            transaction_type: transactionType,
            transaction_value: transactionValue,
            transaction_date: new Date().toISOString(),
          }),
        })

        console.log('New transaction added with new category.')
      } catch (error) {
        console.log(error)
        throw new Error('Failed to add new transaction.')
      }
    } catch (error) {
      console.log(error)
      throw new Error('Failed to add new category.')
    }
  }

  // Caso não houver nem um plano ou uma categoria, temos que criar ambos antes de adicionar a transação.
  try {
    const { plan_id: newPlanId } = await Api.addPlan(
      budgetValue,
      startDate,
      endDate,
    )

    console.log(newPlanId)

    console.log('New plan added.')

    try {
      const { category_id: newCategoryId } = await Api.addCategory(
        newPlanId,
        category,
        categoryBudget,
      )

      console.log(newCategoryId)

      console.log('New category added.')

      try {
        const { transaction_id: transactionId } = await Api.addTransaction(
          newCategoryId,
          transactionType,
          transactionValue,
        )

        console.log(transactionId)

        console.log('New transaction added with new category and new plan.')
      } catch (error) {
        console.log(error)
        throw new Error('Failed to add new transaction.')
      }
    } catch (error) {
      console.log(error)
      throw new Error('Failed to add new category.')
    }
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add new Plan.')
  }

  revalidatePath('/resumo')
  redirect('/resumo/planejamento')
}
