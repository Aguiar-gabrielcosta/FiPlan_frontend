'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Api } from './service/api'
import { validateNewTransaction } from './validation/validateTransaction'
import { validateCategory } from './validation/validateCategory'

export type TransactionActionState = {
  errors?: {
    planId?: string[]
    categoryId?: string[]
    transactionValue?: string[]
    transactionType?: string[]
  }
  message?: string | null
}

// Server function para uma nova transação
export async function newTransaction(
  prevState: TransactionActionState,
  formData: FormData,
) {
  // Validação
  const validatedFields = validateNewTransaction(formData)

  // Caso não for válido, retornar os campos com erro
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Não foi possível registrar a transação. Revise os dados acima.',
    }
  }

  // Sendo válido, realizar as operações necessárias com a API.
  const { categoryId, transactionType, transactionValue } = validatedFields.data

  // Envio os dados da transação
  try {
    const { transaction_id: transactionId } = await Api.addTransaction(
      categoryId,
      transactionType,
      transactionValue,
    )

    console.log('Nova transação registrada, id: ' + transactionId)
  } catch (error) {
    return {
      message: 'Não foi possível registrar a transação.',
    }
  }

  // Revalidar o cache da aplicação e redireciona o usuário para a página de planejamento
  revalidatePath('/resumo')
  revalidatePath('/resumo/planejamento')
  redirect('/resumo/planejamento')
}

export type CategoryActionState = {
  errors?: {
    planId?: string[]
    category?: string[]
    categoryBudget?: string[]
  }
  message?: string | null
}

// Server function para uma nova categoria
export async function newCategory(
  prevState: CategoryActionState,
  formData: FormData,
) {
  console.log(formData)

  // Validação
  const validatedFields = validateCategory(formData)

  // Caso não for válido, retornar os campos com erro
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Não foi possível registrar a nova categoria. Revise os dados acima.',
    }
  }

  // Sendo válido, realizar as operações necessárias com a API.
  const { planId, category, categoryBudget } = validatedFields.data

  // Envio os dados da transação
  try {
    const { category_id: categoryId } = await Api.addCategory(
      planId,
      category,
      categoryBudget,
    )

    console.log('Nova categoria registrada, id: ' + categoryId)
  } catch (error) {
    return {
      message: 'Não foi possível registrar a nova categoria.',
    }
  }

  // Revalidar o cache da aplicação e redireciona o usuário para a página de planejamento
  revalidatePath('/resumo')
  revalidatePath('/resumo/planejamento')
  revalidatePath('/resumo/planejamento/transacao')
  redirect('/resumo/planejamento')
}
