import { monthlyBalance, Plan } from '../definitions'

const apiBaseURL = process.env.API_URL
const userId = process.env.TEST_USER

export async function fetchMonthlyBalance(): Promise<monthlyBalance> {
  try {
    const monthlyBalanceData = await fetch(
      `${apiBaseURL}/transaction/${userId}/balance`,
    )
    return monthlyBalanceData.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch balance')
  }
}

export async function fetchPlans(): Promise<Plan[]> {
  try {
    const plans = await fetch(`${apiBaseURL}/plan/${userId}`)
    return plans.json()
  } catch (error) {
    console.log('Databse error: ' + error)
    throw new Error('Failed to fetch plans')
  }
}
