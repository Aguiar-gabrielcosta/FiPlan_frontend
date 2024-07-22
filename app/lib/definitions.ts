export type Plan = {
  budgetId: string
  startDate: string
  endDate: string
}

export type PlanDetails = {
  budget: number
  totalExpenses: number
  percentage: number
  timeFrame: string
}

export type Balance = {
  income: number
  expense: number
}

export type monthlyBalance = {
  monthIncome: number
  monthExpense: number
}
