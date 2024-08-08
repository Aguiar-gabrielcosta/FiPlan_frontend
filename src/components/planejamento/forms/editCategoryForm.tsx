'use client'

import { ChangeEvent, useState } from 'react'
import { Form } from '../../global/form'
import { Category } from '@/src/lib/definitions'
import { useFormState, useFormStatus } from 'react-dom'
import { updateCategory, UpdateCategoryActionState } from '@/src/lib/actions'

export default function EditCategoryForm({ category }: { category: Category }) {
  const initialState: UpdateCategoryActionState = { message: null, errors: {} }
  const updateCategoryWithId = updateCategory.bind(
    null,
    category.plan_id,
    category.category_id,
  )
  const [state, formAction] = useFormState(updateCategoryWithId, initialState)
  const { pending } = useFormStatus()
  const [categoryUpdates, setCategoryUpdates] = useState({
    category: category.category,
    categoryBudget: category.category_budget.toString(),
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.name
    const update = { ...categoryUpdates }

    if (target === 'category' || target === 'categoryBudget') {
      update[target] = event.target.value

      setCategoryUpdates(update)
    }
  }

  return (
    <Form.Root action={formAction} id="categoryForm">
      <Form.InputArea>
        {/* Nome da categoria */}
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="category" className="font-medium text-primaryDR">
            Nome da Categoria
          </label>
          <input
            type="text"
            name="category"
            id="category"
            aria-describedby="categoryError"
            placeholder="Insira o nome da categoria"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
            value={categoryUpdates.category}
            onChange={(e) => handleChange(e)}
          />
          <div id="categoryError" aria-live="polite">
            {state.errors?.category &&
              state.errors.category.map((error) => (
                <p className="text-sm font-medium text-alertRed" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Orçamento da categoria */}
        <fieldset className="flex flex-col gap-2">
          <label
            htmlFor="categoryBudget"
            className="font-medium text-primaryDR"
          >
            Orçamento da categoria
          </label>
          <input
            type="number"
            name="categoryBudget"
            id="categoryBudget"
            aria-describedby="categoryBudgetError"
            placeholder="Insira o orçamento da categoria"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
            min={0}
            step={0.01}
            value={categoryUpdates.categoryBudget}
            onChange={(e) => handleChange(e)}
          />
          <div id="categoryBudgetError" aria-live="polite">
            {state.errors?.categoryBudget &&
              state.errors.categoryBudget.map((error) => (
                <p className="text-sm font-medium text-alertRed" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </Form.InputArea>

      {/* Mensagem de falha do formulário */}
      {state.message && (
        <p
          className="text-center text-sm font-medium text-alertRed"
          key={state.message}
        >
          {state.message}
        </p>
      )}

      <Form.Buttons pending={pending} />
    </Form.Root>
  )
}
