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
    const monthlyBalanceData = await fetch(
      `${apiBaseURL}/transaction/balance/${userId}`,
    )
    return { data: await monthlyBalanceData.json() }
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
    const plans = await fetch(`${apiBaseURL}/plan/${userId}`)
    return { data: await plans.json() }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar os planos.' }
  }
}

export async function fecthPlanProgress(
  planId: string,
): Promise<{ data?: PlanProgress; message?: string }> {
  try {
    const planProgress = await fetch(
      `${apiBaseURL}/plan/progress/${userId}/${planId}`,
    )
    return { data: await planProgress.json() }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar o progresso do plano.' }
  }
}

export async function fecthExpensesPerCategory(
  planId: string,
): Promise<{ data?: ExpensesPerCategory[]; message?: string }> {
  try {
    const expensesPerCategory = await fetch(
      `${apiBaseURL}/transaction/expenses/category/${userId}/${planId}`,
    )

    return { data: await expensesPerCategory.json() }
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
    const categories = await fetch(`${apiBaseURL}/category/data`)

    return { data: await categories.json() }
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar as categorias.' }
  }
}
