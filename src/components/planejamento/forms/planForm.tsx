'use client'

import { newPlan, PlanActionState } from '@/src/lib/actions'
import { Form } from '../../global/form'
import { useFormState, useFormStatus } from 'react-dom'
import { ChangeEvent, useState } from 'react'
import { Trash2 } from 'lucide-react'

export default function PlanForm() {
  const initialState: PlanActionState = { message: null, errors: {} }
  const [state, formAction] = useFormState(newPlan, initialState)
  const { pending } = useFormStatus()
  const [planBudget, setPlanBudget] = useState('')
  const [newCategories, setNewCategories] = useState<
    {
      category: string
      categoryBudget: string
    }[]
  >([])

  const newCategory = () => {
    const newCategory = { category: '', categoryBudget: '' }

    setNewCategories([newCategory, ...newCategories])
  }

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const data = [...newCategories]
    const target = event.target.name

    if (target === 'category' || target === 'categoryBudget') {
      data[index][target] = event.target.value

      setNewCategories(data)
    }
  }

  const deleteCategory = (index: number) => {
    const categories = [...newCategories]
    categories.splice(index, 1)

    setNewCategories(categories)
  }

  const budgetBalance = () => {
    const budget = parseFloat(planBudget)
    const categories = [...newCategories]

    const categoriesTotalBudget = categories.reduce((total, category) => {
      return (total += parseFloat(category.categoryBudget))
    }, 0)

    const otherBudget = budget - categoriesTotalBudget

    if (isNaN(otherBudget)) {
      return ''
    }

    return otherBudget.toString()
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
            value={planBudget}
            className="rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
            onChange={(e) => setPlanBudget(e.target.value)}
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

      {/* Categorias iniciais do plano */}
      <Form.InputArea>
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-primaryDR">Categorias</h3>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-2 py-1 text-sm text-neutralWhite"
            onClick={() => {
              newCategory()
            }}
          >
            + Adicionar
          </button>
        </div>

        {newCategories.map((category, index) => {
          return (
            <div key={index} className="flex gap-1">
              {/* Nome da nova categoria */}
              <fieldset className="w-2/3">
                <input
                  type="text"
                  name="category"
                  aria-describedby="categoriesError"
                  placeholder="Nome da categoria"
                  className="w-full rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                  value={category.category}
                  onChange={(e) => handleChange(index, e)}
                />
              </fieldset>

              {/* Orçamento da nova categoria */}
              <fieldset className="w-1/3">
                <input
                  type="number"
                  name="categoryBudget"
                  aria-describedby="categoriesError"
                  placeholder="Orçamento"
                  className="w-full rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
                  value={category.categoryBudget}
                  onChange={(e) => handleChange(index, e)}
                  min={0}
                  step={0.01}
                />
              </fieldset>

              <button
                type="button"
                className="flex items-center self-end rounded-lg bg-primary p-1 text-neutralWhite"
                onClick={() => deleteCategory(index)}
              >
                <Trash2 size={22} />
              </button>
            </div>
          )
        })}

        <div className="flex gap-1">
          {/* Nome da nova categoria padrão */}
          <fieldset className="w-2/3">
            <input
              type="text"
              name="category"
              aria-describedby="categoriesError"
              placeholder="Nome da categoria"
              className="w-full rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
              defaultValue="Outros"
            />
          </fieldset>

          {/* Orçamento restante */}
          <fieldset className="w-1/3">
            <input
              type="number"
              name="categoryBudget"
              aria-describedby="categoriesError"
              placeholder="Resto"
              className="w-full cursor-not-allowed rounded-lg border border-primaryDR px-2 py-1 text-sm placeholder:text-primaryD"
              readOnly={true}
              value={budgetBalance()}
              min={0}
              step={0.01}
            />
          </fieldset>
        </div>

        {state.errors?.categories && (
          <p
            className="text-sm font-medium text-alertRed"
            id="categoriesError"
            aria-live="polite"
          >
            Por favor, todas as categorias devem ser nomeadas e possuir
            orçamento maior que R$ 0.
          </p>
        )}
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
