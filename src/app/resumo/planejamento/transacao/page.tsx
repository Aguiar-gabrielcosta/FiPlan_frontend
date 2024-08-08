import LinkButton from '@/src/components/global/LinkButton'
import TransactionForm from '@/src/components/planejamento/forms/transactionForm'
import { Api } from '@/src/lib/service/api'

export default async function Transacao() {
  const plans = await Api.plans()
  const categories = await Api.categories()

  if (!plans.data || plans.data.length === 0) {
    return (
      <div className="flex min-h-full min-w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p>Não foi possível carregar seus planos.</p>
          <p>Caso não os tenha ainda, crie através do link abaixo.</p>
          <LinkButton
            title="Clique para adicionar um novo plano"
            href={'/resumo/planejamento/plano'}
            variant="primary"
          >
            Planos
          </LinkButton>
        </div>
      </div>
    )
  }

  if (!categories.data || categories.data.length === 0) {
    return (
      <div className="flex min-h-full min-w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p>Não foi possível carregar suas categorias.</p>
          <p>Caso não os tenha ainda, crie através do link abaixo.</p>
          <LinkButton
            title="Clique para adicionar uma nova categoria"
            href={'/resumo/planejamento/categoria'}
            variant="primary"
          >
            Categorias
          </LinkButton>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <TransactionForm plans={plans.data} categories={categories.data} />
    </div>
  )
}
