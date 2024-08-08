import Loading from '@/src/components/global/loading'
import PlanInfo from '@/src/components/planejamento/planInfo/planInfo'
import PlanOptionsBar from '@/src/components/planejamento/planOptionsBar'
import { Suspense } from 'react'

export default function Planejamento({
  searchParams,
}: {
  searchParams?: { plan?: string }
}) {
  const planId = searchParams?.plan || ''

  return (
    <div className="flex flex-col gap-2">
      <Suspense fallback={<Loading />}>
        <PlanOptionsBar />
      </Suspense>
      {planId ? (
        <Suspense key={planId} fallback={<Loading />}>
          <PlanInfo planId={planId} />
        </Suspense>
      ) : (
        <p className="mt-8 h-full text-center text-lg font-medium text-primaryDR">
          Selecione um plano na barra acima, ou crie um novo.
        </p>
      )}
    </div>
  )
}
