import { Suspense } from 'react'
import MonthlyBalance from '../../components/resumo/monthlyBalance'
import Loading from '../../components/global/loading'
import FastActions from '../../components/resumo/fastActions'
import ExpensesByCategory from '../../components/resumo/expensesByCategory/expensesByCategory'
import BudgetInfo from '../../components/resumo/planProgress/planInfo'
import DashboardOptionsBar from '../../components/resumo/dashboardOptionsBar'

export default function Resumo({
  searchParams,
}: {
  searchParams?: { plan?: string }
}) {
  const planId = searchParams?.plan

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Suspense fallback={<Loading />}>
          <MonthlyBalance />
        </Suspense>
        <FastActions />
        <Suspense fallback={<Loading />}>
          <DashboardOptionsBar />
        </Suspense>
      </div>
      {planId ? (
        <div className="flex flex-wrap items-start gap-2">
          <Suspense key={planId} fallback={<Loading />}>
            <ExpensesByCategory planId={planId} />
            <BudgetInfo planId={planId} />
          </Suspense>
        </div>
      ) : (
        <div>
          <p className="mt-8 h-full text-center text-lg font-medium text-primaryDR">
            Selecione um plano na barra acima, ou crie um novo.
          </p>
        </div>
      )}
    </div>
  )
}
