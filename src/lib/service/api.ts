import {
  fecthExpensesPerCategory,
  fecthPlanProgress,
  fetchMonthlyBalance,
  fetchPlans,
} from './apiConsumer'
import { addCategory, addPlan, addTransaction } from './apiMutations'

export const Api = {
  monthlyBalance: fetchMonthlyBalance,
  plans: fetchPlans,
  planProgress: fecthPlanProgress,
  expensesPerCategory: fecthExpensesPerCategory,
  addPlan,
  addCategory,
  addTransaction,
}
