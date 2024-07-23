import { Suspense } from 'react'
import MonthlyBalance from '../components/resumo/monthlyBalance'
import Loading from '../components/loading'
import FastActions from '../components/resumo/fastActions'
import PlanSelector from '../components/resumo/planSelector/planSelector'
import ExpensesByCategory from '../components/resumo/expensesByCategory/expensesByCategory'
import BudgetInfo from '../components/resumo/planProgress/planInfo'

export default function Resumo({
  searchParams,
}: {
  searchParams?: { plan?: string }
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const planId = searchParams?.plan || ''

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Suspense fallback={<Loading />}>
          <MonthlyBalance />
        </Suspense>
        <FastActions />
        <PlanSelector />
      </div>
      {planId ? (
        <div className="flex flex-wrap items-start gap-2">
          <ExpensesByCategory planId={planId} />
          <Suspense fallback={<Loading />}>
            <BudgetInfo planId={planId} />
          </Suspense>
        </div>
      ) : (
        <div>
          <h1 className="mt-8 h-full text-center text-lg font-medium text-primaryDR">
            Selecione um plano na barra acima, ou crie um novo.
          </h1>
        </div>
      )}
    </div>
  )
}
