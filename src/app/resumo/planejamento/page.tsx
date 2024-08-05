import PlanInfo from '@/src/components/planejamento/planInfo/planInfo'
import PlanOptionsBar from '@/src/components/planejamento/planOptionsBar'

export default function Planejamento({
  searchParams,
}: {
  searchParams?: { plan?: string }
}) {
  const planId = searchParams?.plan || ''

  return (
    <div className="flex flex-col gap-2">
      <PlanOptionsBar />
      {planId ? (
        <PlanInfo planId={planId} />
      ) : (
        <p className="mt-8 h-full text-center text-lg font-medium text-primaryDR">
          Selecione um plano na barra acima, ou crie um novo.
        </p>
      )}
    </div>
  )
}
