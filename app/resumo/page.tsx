import { Suspense } from 'react'
import MonthlyBalance from '../components/resumo/monthlyBalance'
import Loading from '../components/loading'
import FastActions from '../components/resumo/fastActions'
import PlanSelector from '../components/resumo/planSelector'
import ExpensesByCategory from '../components/resumo/expensesByCategory'

export default function Resumo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[1fr_auto] gap-2">
        <Suspense fallback={<Loading />}>
          <MonthlyBalance />
        </Suspense>
        <FastActions />
        <PlanSelector />
      </div>
      <div className="flex flex-wrap gap-2">
        <ExpensesByCategory />
      </div>
    </div>
  )
}
