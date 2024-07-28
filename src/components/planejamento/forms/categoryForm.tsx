'use client'

import { useState } from 'react'
import { Form } from '../../global/form'
import formatDate from '@/src/lib/utils/formatDate'
import { Plan } from '@/src/lib/definitions'
import { useFormState, useFormStatus } from 'react-dom'
import { CategoryActionState, newCategory } from '@/src/lib/actions'

export default function CategoryForm({ plans }: { plans: Plan[] }) {
  const initialState: CategoryActionState = { message: null, errors: {} }
  const [state, formAction] = useFormState(newCategory, initialState)
  const { pending } = useFormStatus()
  const [planId, setPlanId] = useState('')

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

        {/* Plano */}
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 font-medium text-primaryDR">Plano</legend>
          <div className="block">
            <select
              form="categoryForm"
              className={`w-full cursor-pointer rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD`}
              aria-label="Selecione o plano"
              value={planId}
              name="planId"
              aria-describedby="planIdError"
              onChange={(e) => setPlanId(e.target.value)}
            >
              <option value="" disabled>
                Selecione um plano
              </option>
              {plans.map((plan) => (
                <option
                  key={plan.plan_id}
                  value={plan.plan_id}
                >{`${formatDate(plan.start_date)} até ${formatDate(plan.end_date)}`}</option>
              ))}
            </select>
          </div>
          <div id="planIdError" aria-live="polite">
            {state.errors?.planId &&
              state.errors.planId.map((error) => (
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
