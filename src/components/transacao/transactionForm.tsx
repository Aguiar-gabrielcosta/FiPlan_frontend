'use client'

import { ActionState, newTransaction } from '@/src/lib/actions'
import { Category, Plan } from '@/src/lib/definitions'
import formatDate from '@/src/lib/utils/formatDate'
import { CircleMinus, CirclePlus, SendHorizonal, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { SyncLoader } from 'react-spinners'

export default function TransactionForm({
  plans,
  categories,
}: {
  plans: Plan[]
  categories: Category[]
}) {
  const initialState: ActionState = { message: null, errors: {} }
  const [state, formAction] = useFormState(newTransaction, initialState)
  const { pending } = useFormStatus()
  const [planId, setPlanId] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const validCategories = categories.filter(
    (category) => category.plan_id === planId,
  )

  return (
    <form action={formAction} id="transactionForm">
      <div className="flex w-[452px] flex-col justify-between gap-8 rounded-lg bg-neutralWhite p-4 drop-shadow-md">
        <div className="flex flex-col gap-4 rounded-lg bg-bgL p-4">
          {/* Valor da transação */}
          <fieldset className="flex flex-col gap-2">
            <label
              htmlFor="transactionValue"
              className="font-medium text-primaryDR"
            >
              Valor da transação
            </label>
            <input
              type="number"
              name="transactionValue"
              id="transactionValue"
              placeholder="Insira o valor em reais"
              className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
              min={0}
              step={0.01}
              aria-describedby="transactionValueError"
            />
            <div id="transactionValueError" aria-live="polite">
              {state.errors?.transactionValue &&
                state.errors.transactionValue.map((error) => (
                  <p className="text-sm font-medium text-alertRed" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>

          {/* Tipo de gasto */}
          <fieldset className="flex flex-col">
            <legend className="mb-2 font-medium text-primaryDR">
              Tipo de transação
            </legend>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="transactionType"
                  id="income"
                  value="income"
                  aria-describedby="transactionTypeError"
                />
                <label
                  htmlFor="income"
                  className="flex items-center gap-2 rounded-xl bg-alertGreen px-2 py-1 text-xs text-neutralWhite"
                >
                  Receita
                  <CirclePlus size={14} />
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="transactionType"
                  id="expense"
                  value="expense"
                  aria-describedby="transactionTypeError"
                />
                <label
                  htmlFor="expense"
                  className="flex items-center gap-2 rounded-xl bg-alertRed px-2 py-1 text-xs text-neutralWhite"
                >
                  Gasto
                  <CircleMinus size={14} />
                </label>
              </div>
            </div>
            <div className="mt-2" id="transactionTypeError" aria-live="polite">
              {state.errors?.transactionType &&
                state.errors.transactionType.map((error) => (
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
                form="transactionForm"
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

          {/* Categoria */}
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 font-medium text-primaryDR">
              Categoria
            </legend>
            <div className="flex justify-between">
              <select
                form="transactionForm"
                className={`w-full rounded-lg border border-primaryDR px-2 py-1 text-sm first-letter:uppercase placeholder:text-primaryD ${planId ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                aria-label="Selecione uma categoria"
                name="categoryId"
                aria-describedby="categoryIdError"
                value={categoryId}
                disabled={planId === ''}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="" disabled>
                  Selecione uma categoria
                </option>
                {validCategories.map((category) => (
                  <option
                    className="capitalize"
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category}
                  </option>
                ))}
              </select>
            </div>
            <div id="categoryIdError" aria-live="polite">
              {state.errors?.categoryId &&
                state.errors.categoryId.map((error) => (
                  <p className="text-sm font-medium text-alertRed" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </div>

        {/* Mensagem de falha do formulário */}
        <div className="text-center">
          {state.message && (
            <p
              className="text-sm font-medium text-alertRed"
              key={state.message}
            >
              {state.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Link
            role="button"
            className="flex items-center gap-2 rounded-lg bg-primaryDR px-2 py-1 text-neutralWhite"
            href={'/resumo/planejamento'}
          >
            <X size={20} />
            Cancelar
          </Link>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1 text-neutralWhite"
            disabled={pending}
          >
            {pending ? <SyncLoader size={20} /> : <SendHorizonal size={20} />}
            Enviar
          </button>
        </div>
      </div>
    </form>
  )
}
