const apiBaseURL = process.env.API_URL

export async function fetchMonthlyBalance(): Promise<{
  monthIncome: number
  monthExpense: number
}> {
  try {
    const monthlyBalanceData = await fetch(apiBaseURL + '/transactions/balance')
    return monthlyBalanceData.json()
  } catch (error) {
    console.log('Failed to fecth Monthly Balance: ' + error)
    throw Error('Failed to fecth Monthly Balance ')
  }
}
