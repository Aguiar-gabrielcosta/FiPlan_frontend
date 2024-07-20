const apiBaseURL = process.env.API_URL

export async function fetchTransactions() {
  try {
    const transactionsData = await fetch(apiBaseURL + '/transactions')

    return transactionsData.json()
  } catch (error) {
    console.log(error)
  }
}

export async function fetchBugets() {
  try {
    const budgetsData = await fetch(apiBaseURL + '/plans/budgets')

    return budgetsData.json()
  } catch (error) {
    console.log(error)
  }
}

export async function fetchCategories() {
  try {
    const categoriesData = await fetch(apiBaseURL + '/plans/categories')

    return categoriesData.json()
  } catch (error) {
    console.log(error)
  }
}
