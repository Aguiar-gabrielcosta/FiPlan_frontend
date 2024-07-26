'use client'

import { ActionState, newTransaction } from '@/src/lib/actions'
import { Category, Plan } from '@/src/lib/definitions'
import formatDate from '@/src/lib/utils/formatDate'
import { CircleMinus, CirclePlus, Plus, SendHorizonal, X } from 'lucide-react'
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
  const [newPlan, setNewPlan] = useState(false)
  const [newCategory, setNewCategory] = useState(false)
  const [planId, setPlanId] = useState('')

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
            />
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
          </fieldset>

          {/* Plano */}
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 font-medium text-primaryDR">Plano</legend>
            <div className="flex justify-between">
              <select
                form="transactionForm"
                className={`rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD ${newPlan ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label="Selecione o plano"
                value={planId}
                name="planId"
                disabled={newPlan}
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
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-primary px-2 text-neutralWhite transition-all hover:bg-primaryD"
                onClick={() => {
                  setNewPlan(!newPlan)
                  setPlanId('')
                }}
              >
                <Plus size={20} />
                Novo plano
              </button>
            </div>
            {/* Formulário para adicionar novo plano */}
            {newPlan && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="budgetValue"
                    className="font-medium text-primaryDR"
                  >
                    Orçamento
                  </label>
                  <input
                    type="number"
                    name="budgetValue"
                    id="budgetValue"
                    placeholder="Insira o orçamento do plano"
                    className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                    min={0}
                    step={0.01}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="startDate"
                    className="font-medium text-primaryDR"
                  >
                    Data de início
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="Insira a data de início"
                    className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="endDate"
                    className="font-medium text-primaryDR"
                  >
                    Data do fim
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="Insira a data do fim"
                    className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                  />
                </div>
              </div>
            )}
          </fieldset>

          {/* Categoria */}
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-2 font-medium text-primaryDR">
              Categoria
            </legend>
            <div className="flex justify-between">
              <select
                form="transactionForm"
                className={`rounded-lg border border-primaryDR px-2 py-1 text-sm first-letter:uppercase placeholder:text-primaryD ${newCategory || newPlan ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label="Selecione uma categoria"
                name="categoryId"
                defaultValue=""
                disabled={newCategory || newPlan}
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
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg bg-primary px-2 text-neutralWhite transition-all hover:bg-primaryD"
                onClick={() => setNewCategory(!newCategory)}
              >
                <Plus size={20} />
                Nova categoria
              </button>
            </div>
            {/* Formulário para adicionar nova categoria */}
            {newCategory && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="category"
                    className="font-medium text-primaryDR"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Insira o nome da categoria"
                    className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="categoryBudget"
                    className="font-medium text-primaryDR"
                  >
                    Orçamento
                  </label>
                  <input
                    type="number"
                    name="categoryBudget"
                    id="categoryBudget"
                    placeholder="Insira o orçamento da categoria"
                    className="w-64 rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                    min={0}
                    step={0.01}
                  />
                </div>
              </div>
            )}
          </fieldset>
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
