'use client'

import { newPlan, PlanActionState } from '@/src/lib/actions'
import { Form } from '../../global/form'
import { useFormState, useFormStatus } from 'react-dom'

export default function PlanForm() {
  const initialState: PlanActionState = { message: null, errors: {} }
  const [state, formAction] = useFormState(newPlan, initialState)
  const { pending } = useFormStatus()

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

      <Form.Buttons pending={pending} />
    </Form.Root>
  )
}
