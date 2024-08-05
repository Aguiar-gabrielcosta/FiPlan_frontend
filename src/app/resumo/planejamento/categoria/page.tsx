import LinkButton from '@/src/components/global/LinkButton'
import CategoryForm from '@/src/components/planejamento/forms/categoryForm'
import { Api } from '@/src/lib/service/api'

export default async function Categoria() {
  const plans = await Api.plans()

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

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <CategoryForm plans={plans.data} />
    </div>
  )
}
