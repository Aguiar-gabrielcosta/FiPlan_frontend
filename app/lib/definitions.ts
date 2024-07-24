// Tipos de respostas da api
export type monthlyBalance = {
  monthIncome: number
  monthExpense: number
}

export type Plan = {
  plan_id: string
  budget_value: string
  start_date: string
  end_date: string
}

export type PlanProgress = {
  budget_value: number
  total_expenses: number
  start_date: string
  end_date: string
  progress: number
}

export type ExpensesPerCategory = {
  category: string
  expenses: number
  category_budget: number
  progress: number
}

// Tipos de envio de requisições
export type PlanUser = {
  user_id: string
  plan_id: string
}
