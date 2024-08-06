// Tipos de respostas da api
export type monthlyBalance = {
  month_income: number
  month_expense: number
}

export type Plan = {
  plan_id: string
  budget_value: string
  start_date: string
  end_date: string
}

export type Category = {
  category_id: number
  category: string
  category_budget: number
  plan_id: string
}

export type PlanProgress = {
  budget_value: number
  total_expenses: number
  start_date: string
  end_date: string
  progress: number
}

export type CategoriesProgress = {
  category_id: number
  category: string
  category_budget: number
  total_expenses: number
  progress: number
}

export type ExpensesPerCategory = {
  category: string
  expenses: number
  category_budget: number
  progress: number
}
