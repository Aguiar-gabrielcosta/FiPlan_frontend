import { Api } from '@/src/lib/service/api'
import OptionsBar from '../global/optionsBar'
import PlanSelectorForm from '../global/planSelect'
import LinkButton from '../global/LinkButton'

export default async function PlanOptionsBar() {
  const plans = await Api.plans()

  if (!plans.data) {
    return (
      <OptionsBar title="Planejamentos">
        <>
          {plans.message && (
            <p className="text-center text-alertRed">{plans.message}</p>
          )}
        </>
      </OptionsBar>
    )
  }

  return (
    <OptionsBar title="Planejamentos">
      <div className="flex items-center gap-2">
        <PlanSelectorForm data={plans.data} />
        <LinkButton
          href="/resumo/planejamento/categoria"
          title="Clique para adicionar uma categoria ao plano"
          variant="primary"
        >
          + Categoria
        </LinkButton>
        <LinkButton
          href="/resumo/planejamento/transacao"
          title="Clique para adicionar uma transação ao plano"
          variant="primary"
        >
          + Transação
        </LinkButton>
      </div>
      <LinkButton
        title="Clique para adicionar um novo plano"
        href="/resumo/planejamento/plano"
        variant="primary"
      >
        Novo Plano
      </LinkButton>
    </OptionsBar>
  )
}
