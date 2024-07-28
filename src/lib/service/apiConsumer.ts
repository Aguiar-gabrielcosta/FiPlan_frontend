import {
  Category,
  ExpensesPerCategory,
  monthlyBalance,
  Plan,
  PlanProgress,
} from '../definitions'

const apiBaseURL = process.env.API_URL
const userId = process.env.TEST_USER

export async function fetchMonthlyBalance(): Promise<{
  data?: monthlyBalance
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/transaction/balance/${userId}`)
    const monthlyBalance = await res.json()
    return { data: monthlyBalance }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o balanço mensal.' }
  }
}

export async function fetchPlans(): Promise<{
  data?: Plan[]
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/plan/${userId}`)
    const plans = await res.json()
    return { data: Array.isArray(plans) ? plans : [] }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar os planos.' }
  }
}

export async function fecthPlanProgress(
  planId: string,
): Promise<{ data?: PlanProgress; message?: string }> {
  try {
    const res = await fetch(`${apiBaseURL}/plan/progress/${userId}/${planId}`)
    const planProgress = await res.json()
    return { data: planProgress }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o progresso do plano.' }
  }
}

export async function fecthExpensesPerCategory(
  planId: string,
): Promise<{ data?: ExpensesPerCategory[]; message?: string }> {
  try {
    const res = await fetch(
      `${apiBaseURL}/transaction/expenses/category/${userId}/${planId}`,
    )
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

export async function fetchCategories(): Promise<{
  data?: Category[]
  message?: string
}> {
  try {
    const res = await fetch(`${apiBaseURL}/category/data`)
    const categories = await res.json()
    return { data: Array.isArray(categories) ? categories : [] }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar as categorias.' }
  }
}
