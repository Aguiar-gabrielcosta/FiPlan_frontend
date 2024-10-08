'use client'

import { Form } from '../../global/form'
import { useFormState } from 'react-dom'
import { ChangeEvent, useState } from 'react'
import { Plan } from '@/src/lib/definitions'
import { updatePlan, UpdatePlanActionState } from '@/src/lib/actions'

export default function EditPlanForm({ plan }: { plan: Plan }) {
  const initialState: UpdatePlanActionState = { message: null, errors: {} }
  const updatePlanWithId = updatePlan.bind(null, plan.plan_id)
  const [state, formAction] = useFormState(updatePlanWithId, initialState)
  const [planUpdates, setPlanUpdates] = useState({
    budgetValue: plan.budget_value,
    startDate: plan.start_date,
    endDate: plan.end_date,
    planId: plan.plan_id,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.name
    const update = { ...planUpdates }

    if (
      target === 'budgetValue' ||
      target === 'startDate' ||
      target === 'endDate'
    ) {
      update[target] = event.target.value

      setPlanUpdates(update)
    }
  }

  return (
    <Form.Root action={formAction} id="planForm">
      <Form.InputArea>
        {/* Orçamento do plano */}
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="budgetValue" className="font-medium text-primaryDR">
            Valor do orçamento
          </label>
          <input
            type="number"
            name="budgetValue"
            id="budgetValue"
            aria-describedby="budgetValueError"
            placeholder="Insira o orçamento do plano"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
            value={planUpdates.budgetValue}
            onChange={(e) => handleChange(e)}
          />
          <div id="budgetValueError" aria-live="polite">
            {state.errors?.budgetValue &&
              state.errors.budgetValue.map((error) => (
                <p className="text-sm font-medium text-alertRed" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Data de início do plano */}
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="startDate" className="font-medium text-primaryDR">
            Data de ínicio
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            aria-describedby="startDateError"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
            value={planUpdates.startDate.slice(0, 10)}
            onChange={(e) => handleChange(e)}
          />
          <div id="startDateError" aria-live="polite">
            {state.errors?.startDate &&
              state.errors.startDate.map((error) => (
                <p className="text-sm font-medium text-alertRed" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        {/* Data do fim do plano */}
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="endDate" className="font-medium text-primaryDR">
            Data do fim
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            aria-describedby="endDateError"
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
            value={planUpdates.endDate.slice(0, 10)}
            onChange={(e) => handleChange(e)}
          />
          <div id="endDateError" aria-live="polite">
            {state.errors?.endDate &&
              state.errors.endDate.map((error) => (
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

      <Form.Buttons cancelHref="/resumo/planejamento" />
    </Form.Root>
  )
}
