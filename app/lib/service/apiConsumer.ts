import { monthlyBalance, Plan } from '../definitions'

const apiBaseURL = process.env.API_URL

export async function fetchMonthlyBalance(): Promise<monthlyBalance> {
  try {
    const monthlyBalanceData = await fetch(apiBaseURL + '/transactions/balance')
    return monthlyBalanceData.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch balance')
  }
}

export async function fetchPlans(): Promise<Plan[]> {
  try {
    const plans = await fetch(apiBaseURL + '/plans')
    return plans.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch plans')
  }
}
