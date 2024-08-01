import {
  fecthExpensesPerCategory,
  fecthPlanProgress,
  fetchCategories,
  fetchMonthlyBalance,
  fetchPlans,
} from './apiConsumer'
import { addCategory, addPlan, addTransaction } from './apiMutations'

export const Api = {
  monthlyBalance: fetchMonthlyBalance,
  plans: fetchPlans,
  planProgress: fecthPlanProgress,
  expensesPerCategory: fecthExpensesPerCategory,
  categories: fetchCategories,
  addPlan,
  addCategory,
  addTransaction,
}
