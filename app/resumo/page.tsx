import { Suspense } from 'react'
import MonthlyBalance from '../components/resumo/monthlyBalance'
import Loading from '../components/loading'

export default function Resumo() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MonthlyBalance />
      </Suspense>
    </>
  )
}
