const apiBaseURL = process.env.API_URL

export async function fetchMonthlyBalance(): Promise<{
  monthIncome: number
  monthExpense: number
}> {
  try {
    const monthlyBalanceData = await fetch(apiBaseURL + '/transactions/balance')
    return monthlyBalanceData.json()
  } catch (error) {
    console.log('Failed to fetch Monthly Balance: ' + error)
    throw Error('Failed to fetch Monthly Balance')
  }
}

export async function fetchPlans(): Promise<
  {
    budgetId: string
    startDate: string
    endDate: string
  }[]
> {
  try {
    const plans = await fetch(apiBaseURL + '/plans')
    return plans.json()
  } catch (error) {
    console.log('Failed to fetch plans: ' + error)
    throw Error('Failed to fecth plans')
  }
}
