import { getSessionData } from '../utils/sessionUtils'

const apiBaseURL = process.env.API_URL

export async function addPlan(
  budgetValue: number,
  startDate: string,
  endDate: string,
): Promise<{ plan_id: string }> {
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/plan/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({
      user_id: session?.userId,
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
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/category/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({
      user_id: session?.userId,
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
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/transaction/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({
      user_id: session?.userId,
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

export async function addCategoryBatch(
  planId: string,
  categoryArray: {
    category: string
    categoryBudget: number
  }[],
) {
  const session = await getSessionData()
  const categories = categoryArray.map((category) => {
    return {
      user_id: session?.userId,
      plan_id: planId,
      category: category.category,
      category_budget: category.categoryBudget,
    }
  })

  const res = await fetch(`${apiBaseURL}/category/data/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({ categories }),
  })

  if (res.ok) {
    const ids = await res.json()
    return ids.map((id: { category_id: number }) => id.category_id)
  } else {
    throw new Error('Database error: Não foi possível adicionar a categoria')
  }
}

export async function deletePlan(planId: string) {
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/plan/data/${planId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${session?.jwt}`,
    },
  })

  if (res.ok) {
    const { affected } = await res.json()
    return affected
  } else {
    throw new Error('Database error: Não foi possível deletar o plano')
  }
}

export async function deleteCategory(categoryId: number) {
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/category/data/${categoryId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${session?.jwt}` },
  })

  if (res.ok) {
    const { affected } = await res.json()
    return affected
  } else {
    throw new Error('Database error: Não foi possível deletar a categoria')
  }
}

export async function deleteTransaction(transactionId: string) {
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/transaction/data/${transactionId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${session?.jwt}` },
  })

  if (res.ok) {
    const { affected } = await res.json()
    return affected
  } else {
    throw new Error('Database error: Não foi possível deletar a transação')
  }
}

export async function updateCategory(
  categoryId: number,
  category: string,
  categoryBudget: number,
) {
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/category/data/${categoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({
      category,
      category_budget: categoryBudget,
    }),
  })

  if (res.ok) {
    const { affected } = await res.json()
    return affected
  } else {
    throw new Error('Database error: Não foi possível atualizar a categoria')
  }
}

export async function updatePlan(
  planId: string,
  budgetValue: number,
  startDate: string,
  endDate: string,
) {
  const session = await getSessionData()
  const res = await fetch(`${apiBaseURL}/plan/data/${planId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({
      user_id: session?.userId,
      budget_value: budgetValue,
      start_date: startDate,
      end_date: endDate,
    }),
  })

  if (res.ok) {
    const { affected } = await res.json()
    return affected
  } else {
    throw new Error('Database error: Não foi possível atualizar o plano')
  }
}

export async function signIn(username: string, password: string) {
  const res = await fetch(`${apiBaseURL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
    cache: 'no-cache',
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('Database error: Não foi possível realizar a autenticação')
  }
}
