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
    return monthlyBalanceData.json()
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
    return plans.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    return { message: 'Não foi possível recuperar os planos.' }
  }
}

export async function fecthPlanProgress(planId: string): Promise<PlanProgress> {
  try {
    const planProgress = await fetch(
      `${apiBaseURL}/plan/progress/${userId}/${planId}`,
    )
    return planProgress.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch plan progress.')
  }
}

export async function fecthExpensesPerCategory(
  planId: string,
): Promise<ExpensesPerCategory[]> {
  try {
    const expensesPerCategory = await fetch(
      `${apiBaseURL}/transaction/expenses/category/${userId}/${planId}`,
    )

    return expensesPerCategory.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch expenses per category data.')
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const categories = await fetch(`${apiBaseURL}/category/data`)
    return categories.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch categories.')
  }
}
