'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Api } from './service/api'
import { validateNewTransaction } from './validation/validateTransaction'
import { validateCategory } from './validation/validateCategory'
import { validatePlan } from './validation/validatePlan'

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

export type PlanActionState = {
  errors?: {
    budgetValue?: string[]
    startDate?: string[]
    endDate?: string[]
    categories?: string[]
  }
  message?: string | null
}

// Server function para criar um novo plano
export async function newPlan(prevState: PlanActionState, formData: FormData) {
  // Validação
  const validatedFields = validatePlan(formData)

  // Caso não forem válidas as entradas retorna o erro
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Não foi possível registrar o novo plano. Revise os dados acima.',
    }
  }

  // Sendo válido, realiza as operações para envio dos dados para a API.
  const { budgetValue, endDate, startDate, categories } = validatedFields.data

  try {
    const { plan_id: planId } = await Api.addPlan(
      budgetValue,
      startDate,
      endDate,
    )

    console.log('Novo plano registrado, id: ' + planId)

    try {
      const ids = await Api.addCategoryBatch(planId, categories)

      console.log('Novas categorias registradas, ids: ' + ids)
    } catch {
      return {
        message: 'Não foi possível registrar as novas categorias.',
      }
    }
  } catch {
    return {
      message: 'Não foi possível registrar o novo plano.',
    }
  }

  // Revalida o cache da aplicação e redireciona o usuário para a página de planjejamento
  revalidatePath('/resumo')
  revalidatePath('/resumo/planejamento')
  revalidatePath('/resumo/planejamento/transacao')
  revalidatePath('/resumo/planejamento/categoria')
  redirect('/resumo/planejamento')
}

// Server function para deletar uma categoria
export async function deleteCategory(categoryId: number) {
  try {
    const affected = await Api.deleteCategory(categoryId)

    console.log('Categorias deletadas: ', affected)
  } catch {
    return {
      message: 'Não foi possível deletar a categoria.',
    }
  }

  // Revalida o cache
  revalidatePath('/resumo')
  revalidatePath('/resumo/planejamento')
  revalidatePath('/resumo/planejamento/transacao')
}

// Server function para deletar um plano
export async function deletePlan(planId: string) {
  try {
    const affected = await Api.deletePlan(planId)

    console.log('Planos deletados: ', affected)
  } catch {
    return {
      message: 'Não foi possível deletar o plano.',
    }
  }

  // Revalida o cache
  revalidatePath('/resumo')
  revalidatePath('/resumo/planejamento')
  revalidatePath('/resumo/planejamento/transacao')
  revalidatePath('/resumo/planejamento/categoria')
  redirect('/resumo/planejamento')
}
