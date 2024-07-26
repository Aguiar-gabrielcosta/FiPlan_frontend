'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Api } from './service/api'
import { validateNewTransaction } from './validation/validateTransaction'

export type ActionState = {
  errors?: Record<string, string[]>
  message?: string | null
}

export async function newTransaction(
  prevState: ActionState,
  formData: FormData,
) {
  // Validação
  const validatedFields = validateNewTransaction(formData)

  // Caso não for válido, retornar os campos com erro
  if (!validatedFields.success) {
    const errors: Record<string, string[]> = {}
    validatedFields.error.errors.forEach((error) => {
      const path = error.path.join('.')
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(error.message)
    })
    return {
      errors,
      message: 'Não foi possível realizar a transação.',
    }
  }

  const { planId, categoryId, form } = validatedFields.data

  // Sendo válido, realizar as operações necessárias com a API.

  // Se houver um plano e uma categoria já cadastrada, apenas envia os dados da transação
  if (planId && categoryId) {
    try {
      const { transaction_id: transactionId } = await Api.addTransaction(
        categoryId,
        form.transactionType,
        form.transactionValue,
      )

      console.log(
        'New transaction added in existing plan and category: ' + transactionId,
      )
    } catch (error) {
      return {
        message: 'Não foi possível realizar a transação.',
      }
    }
  }

  // Se houver um plano mas utilizando uma nova categoria, primeiro deve-se adicionar a categoria
  if (planId && !categoryId && 'planId' in form) {
    try {
      const { category_id: newCategoryId } = await Api.addCategory(
        planId,
        form.category,
        form.categoryBudget,
      )

      console.log('New category added: ' + newCategoryId)

      try {
        const { transaction_id: transactionId } = await Api.addTransaction(
          newCategoryId,
          form.transactionType,
          form.transactionValue,
        )

        console.log('New transaction added with new category: ' + transactionId)
      } catch (error) {
        return {
          message: 'Não foi possível realizar a transação.',
        }
      }
    } catch (error) {
      return {
        message: 'Não foi possível realizar criar a nova categoria.',
      }
    }
  }

  // Caso não houver nem um plano ou uma categoria, temos que criar ambos antes de adicionar a transação.
  if (!planId && 'budgetValue' in form) {
    try {
      const { plan_id: newPlanId } = await Api.addPlan(
        form.budgetValue,
        form.startDate,
        form.endDate,
      )

      console.log('New plan added: ' + newPlanId)

      try {
        const { category_id: newCategoryId } = await Api.addCategory(
          newPlanId,
          form.category,
          form.categoryBudget,
        )

        console.log('New category added: ' + newCategoryId)

        try {
          const { transaction_id: transactionId } = await Api.addTransaction(
            newCategoryId,
            form.transactionType,
            form.transactionValue,
          )

          console.log(
            'New transaction added with new category and new plan: ' +
              transactionId,
          )
        } catch (error) {
          return {
            message: 'Não foi possível realizar a transação.',
          }
        }
      } catch (error) {
        return {
          message: 'Não foi possível criar a nova categoria.',
        }
      }
    } catch (error) {
      return {
        message: 'Não foi possível criar o novo plano',
      }
    }
  }

  revalidatePath('/resumo')
  redirect('/resumo/planejamento')
}
