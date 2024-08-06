import {
  CategoriesProgress,
  Category,
  ExpensesPerCategory,
  monthlyBalance,
  Plan,
  PlanProgress,
} from '../definitions'

const apiBaseURL = process.env.API_URL
const userId = process.env.TEST_USER_FRESH

export async function fetchMonthlyBalance(): Promise<{
  data?: monthlyBalance
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/transaction/balance/${userId}`)

    if (!res.ok) {
      throw new Error()
    }

    const monthlyBalance = await res.json()

    return { data: monthlyBalance }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o balanço mensal.' }
  }
}

export async function fetchUserPlans(): Promise<{
  data?: Plan[]
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/plan/${userId}`)

    if (!res.ok) {
      throw new Error()
    }

    const plans = await res.json()

    return { data: Array.isArray(plans) ? plans : [] }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar os planos.' }
  }
}

export async function fetchPlanById(planId: string): Promise<{
  data?: Plan
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/plan/data/${planId}`)

    if (!res.ok) {
      throw new Error()
    }

    const plan = await res.json()

    return { data: plan }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o plano.' }
  }
}

export async function fecthPlanProgress(
  planId: string,
): Promise<{ data?: PlanProgress; message?: string }> {
  try {
    const res = await fetch(`${apiBaseURL}/plan/progress/${userId}/${planId}`)

    if (!res.ok) {
      throw new Error()
    }

    const planProgress = await res.json()

    return { data: planProgress }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o progresso do plano.' }
  }
}

export async function fecthCategoriesProgress(
  planId: string,
): Promise<{ data?: CategoriesProgress[]; message?: string }> {
  try {
    const res = await fetch(
      `${apiBaseURL}/category/progress/${userId}/${planId}`,
    )

    if (!res.ok) {
      throw new Error()
    }

    const planProgress = await res.json()

    return { data: planProgress }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o progresso das categorias.' }
  }
}

export async function fecthExpensesPerCategory(
  planId: string,
): Promise<{ data?: ExpensesPerCategory[]; message?: string }> {
  try {
    const res = await fetch(
      `${apiBaseURL}/transaction/expenses/category/${userId}/${planId}`,
    )

    if (!res.ok) {
      throw new Error()
    }

    const expensesPerCategory = await res.json()

    return {
      data: Array.isArray(expensesPerCategory) ? expensesPerCategory : [],
    }
  } catch (error) {
    console.log('Databse error: ' + error)
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
    const res = await fetch(`${apiBaseURL}/category/${userId}`)

    if (!res.ok) {
      throw new Error()
    }

    const categories = await res.json()

    return { data: Array.isArray(categories) ? categories : [] }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar as categorias.' }
  }
}

export async function fetchCategoryById(categoryId: number): Promise<{
  data?: Category
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/category/data/${categoryId}`)

    if (!res.ok) {
      throw new Error()
    }

    const category = await res.json()

    return { data: category }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar a categoria.' }
  }
}

export async function fetchCategoriesByPlan(planId: string): Promise<{
  data?: Omit<Category, 'plan_id'>[]
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/category/plan/${planId}`)

    if (!res.ok) {
      throw new Error()
    }

    const categories = await res.json()

    return { data: Array.isArray(categories) ? categories : [] }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar as categorias.' }
  }
}
