'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Api } from './service/api'
import { validateNewTransaction } from './validation/validateTransaction'

export type ActionState = {
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
  prevState: ActionState,
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
  redirect('/resumo/planejamento')
}
