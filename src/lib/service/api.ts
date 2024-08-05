import {
  fecthCategoriesProgress,
  fecthExpensesPerCategory,
  fecthPlanProgress,
  fetchCategories,
  fetchMonthlyBalance,
  fetchPlans,
} from './apiConsumer'
import {
  addCategory,
  addCategoryBatch,
  addPlan,
  addTransaction,
} from './apiMutations'

export const Api = {
  monthlyBalance: fetchMonthlyBalance,
  plans: fetchPlans,
  planProgress: fecthPlanProgress,
  categoriesProgress: fecthCategoriesProgress,
  expensesPerCategory: fecthExpensesPerCategory,
  categories: fetchCategories,
  addPlan,
  addCategory,
  addCategoryBatch,
  addTransaction,
}
