import {
  CategoriesProgress,
  Category,
  ExpensesPerCategory,
  monthlyBalance,
  Plan,
  PlanProgress,
} from '../definitions'
import { getSessionData } from '../utils/sessionUtils'

const apiBaseURL = process.env.API_URL

export async function fetchMonthlyBalance(): Promise<{
  data?: monthlyBalance
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(
      `${apiBaseURL}/transaction/balance/${session?.userId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
      },
    )

    if (!res.ok) {
      throw new Error()
    }

    const monthlyBalance = await res.json()

    return { data: monthlyBalance }
  } catch (error) {
    console.log('Databse error: Não foi possível recuperar o balanço mensal.')
    return { message: 'Não foi possível recuperar o balanço mensal.' }
  }
}

export async function fetchUserPlans(): Promise<{
  data?: Plan[]
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(`${apiBaseURL}/plan/${session?.userId}`, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })

    if (!res.ok) {
      throw new Error()
    }

    const plans = await res.json()

    return { data: Array.isArray(plans) ? plans : [] }
  } catch (error) {
    console.log('Databse error: Não foi possível recuperar os planos.')
    return { message: 'Não foi possível recuperar os planos.' }
  }
}

export async function fetchPlanById(planId: string): Promise<{
  data?: Plan
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(`${apiBaseURL}/plan/data/${planId}`, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })

    if (!res.ok) {
      throw new Error()
    }

    const plan = await res.json()

    return { data: plan }
  } catch (error) {
    console.log('Databse error: Não foi possível recuperar o plano.')
    return { message: 'Não foi possível recuperar o plano.' }
  }
}

export async function fecthPlanProgress(
  planId: string,
): Promise<{ data?: PlanProgress; message?: string }> {
  try {
    const session = await getSessionData()
    const res = await fetch(
      `${apiBaseURL}/plan/progress/${session?.userId}/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
      },
    )

    if (!res.ok) {
      throw new Error()
    }

    const planProgress = await res.json()

    return { data: planProgress }
  } catch (error) {
    console.log(
      'Databse error: Não foi possível recuperar o progresso do plano.',
    )
    return { message: 'Não foi possível recuperar o progresso do plano.' }
  }
}

export async function fecthCategoriesProgress(
  planId: string,
): Promise<{ data?: CategoriesProgress[]; message?: string }> {
  try {
    const session = await getSessionData()
    const res = await fetch(
      `${apiBaseURL}/category/progress/${session?.userId}/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
      },
    )

    if (!res.ok) {
      throw new Error()
    }

    const planProgress = await res.json()

    return { data: planProgress }
  } catch (error) {
    console.log(
      'Databse error: Não foi possível recuperar o progresso das categorias.',
    )
    return { message: 'Não foi possível recuperar o progresso das categorias.' }
  }
}

export async function fecthExpensesPerCategory(
  planId: string,
): Promise<{ data?: ExpensesPerCategory[]; message?: string }> {
  try {
    const session = await getSessionData()
    const res = await fetch(
      `${apiBaseURL}/transaction/expenses/category/${session?.userId}/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
      },
    )

    if (!res.ok) {
      throw new Error()
    }

    const expensesPerCategory = await res.json()

    return {
      data: Array.isArray(expensesPerCategory) ? expensesPerCategory : [],
    }
  } catch (error) {
    console.log(
      'Databse error: Não foi possível recuperar a relação de categoria e gastos.',
    )
    return {
      message: 'Não foi possível recuperar a relação de categoria e gastos.',
    }
  }
}

export async function fetchUserCategories(): Promise<{
  data?: Category[]
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(`${apiBaseURL}/category/${session?.userId}`, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })

    if (!res.ok) {
      throw new Error()
    }

    const categories = await res.json()

    return { data: Array.isArray(categories) ? categories : [] }
  } catch (error) {
    console.log('Databse error: Não foi possível recuperar as categorias.')
    return { message: 'Não foi possível recuperar as categorias.' }
  }
}

export async function fetchCategoryById(categoryId: number): Promise<{
  data?: Category
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(`${apiBaseURL}/category/data/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })

    if (!res.ok) {
      throw new Error()
    }

    const category = await res.json()

    return { data: category }
  } catch (error) {
    console.log('Databse error: Não foi possível recuperar a categoria.')
    return { message: 'Não foi possível recuperar a categoria.' }
  }
}

export async function fetchCategoriesByPlan(planId: string): Promise<{
  data?: Omit<Category, 'plan_id'>[]
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(`${apiBaseURL}/category/plan/${planId}`, {
      headers: {
        Authorization: `Bearer ${session?.jwt}`,
      },
    })

    if (!res.ok) {
      throw new Error()
    }

    const categories = await res.json()

    return { data: Array.isArray(categories) ? categories : [] }
  } catch (error) {
    console.log('Databse error: Não foi possível recuperar as categorias.')
    return { message: 'Não foi possível recuperar as categorias.' }
  }
}

export async function fetchTransactionNumberOfPages(): Promise<{
  data?: number
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(
      `${apiBaseURL}/transaction/pages/${session?.userId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
      },
    )

    if (!res.ok) {
      throw new Error()
    }

    const pagesInfo = await res.json()

    return { data: pagesInfo.pages }
  } catch (error) {
    console.log(
      'Database error: Não foi possível recuperar o número de páginas',
    )
    return { message: 'Não foi possível recuperar o número de páginas.' }
  }
}

export async function fetchTransactionPage(page: number): Promise<{
  data?: {
    transaction_id: string
    category: string
    transaction_value: number
    transaction_type: 'expense' | 'income'
    transaction_date: string
  }[]
  message?: string
}> {
  try {
    const session = await getSessionData()
    const res = await fetch(
      `${apiBaseURL}/transaction/history/${session?.userId}/${page}`,
      {
        headers: {
          Authorization: `Bearer ${session?.jwt}`,
        },
      },
    )

    if (!res.ok) {
      throw new Error()
    }

    const transactions = await res.json()

    return { data: Array.isArray(transactions) ? transactions : [] }
  } catch (error) {
    console.log(
      'Database error: Não foi possível recuperar o número de páginas',
    )
    return { message: 'Não foi possível recuperar o número de páginas.' }
  }
}
