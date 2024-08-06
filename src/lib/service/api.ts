import {
  fecthCategoriesProgress,
  fecthExpensesPerCategory,
  fecthPlanProgress,
  fetchCategoriesByPlan,
  fetchMonthlyBalance,
  fetchPlanById,
  fetchUserCategories,
  fetchUserPlans,
} from './apiConsumer'
import {
  addCategory,
  addCategoryBatch,
  addPlan,
  addTransaction,
  deleteCategory,
  deletePlan,
  updatePlan,
} from './apiMutations'

export const Api = {
  monthlyBalance: fetchMonthlyBalance,
  plans: fetchUserPlans,
  planById: fetchPlanById,
  planProgress: fecthPlanProgress,
  categoriesProgress: fecthCategoriesProgress,
  expensesPerCategory: fecthExpensesPerCategory,
  categories: fetchUserCategories,
  categoriesByPlan: fetchCategoriesByPlan,
  addPlan,
  addCategory,
  addCategoryBatch,
  addTransaction,
  deletePlan,
  deleteCategory,
  updatePlan,
}
