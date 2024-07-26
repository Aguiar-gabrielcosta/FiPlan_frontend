const apiBaseURL = process.env.API_URL
const userId = process.env.TEST_USER

export async function addPlan(
  budgetValue: number,
  startDate: string,
  endDate: string,
): Promise<{ plan_id: string }> {
  const res = await fetch(`${apiBaseURL}/plan/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      budget_value: budgetValue,
      start_date: startDate,
      end_date: endDate,
    }),
  })

  console.log('AddPlan' + res.ok)

  return res.json()
}

export async function addCategory(
  planId: string,
  category: string,
  categoryBudget: number,
): Promise<{ category_id: number }> {
  const res = await fetch(`${apiBaseURL}/category/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plan_id: planId,
      category,
      category_budget: categoryBudget,
    }),
  })

  console.log('AddCategory' + res.ok)

  return res.json()
}

export async function addTransaction(
  categoryId: number,
  transactionType: 'income' | 'expense',
  transactionValue: number,
): Promise<{ transaction_id: number }> {
  const res = await fetch(`${apiBaseURL}/transaction/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      category_id: categoryId,
      transaction_type: transactionType,
      transaction_value: transactionValue,
      transaction_date: new Date().toISOString(),
    }),
  })

  console.log('AddTransaction' + res.ok)

  return res.json()
}
