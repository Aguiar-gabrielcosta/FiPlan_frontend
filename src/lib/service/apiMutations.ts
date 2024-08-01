const apiBaseURL = process.env.API_URL
const userId = process.env.TEST_USER_FRESH

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

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Database error: Não foi possível adicionar o plano.')
  }
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
      user_id: userId,
      plan_id: planId,
      category,
      category_budget: categoryBudget,
    }),
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Database error: Não foi possível adicionar a categoria')
  }
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

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Database error: Não foi possível adicionar a transação.')
  }
}
