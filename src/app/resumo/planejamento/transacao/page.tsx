import TransactionForm from '@/src/components/planejamento/forms/transactionForm'
import { Api } from '@/src/lib/service/api'
import Link from 'next/link'

export default async function Transacao() {
  const plans = await Api.plans()
  const categories = await Api.categories()

  if (!plans.data) {
    return (
      <div className="flex min-h-full min-w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p>Não foi possível carregar seus planos.</p>
          <p>Caso não os tenha ainda, crie através do link abaixo.</p>
          <Link
            className="m-2 rounded-lg bg-primary p-2 text-neutralWhite"
            href={'/resumo/planejamento/plano'}
          >
            Planos
          </Link>
        </div>
      </div>
    )
  }

  if (!categories.data) {
    return (
      <div className="flex min-h-full min-w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p>Não foi possível carregar suas categorias.</p>
          <p>Caso não os tenha ainda, crie através do link abaixo.</p>
          <Link
            className="m-2 rounded-lg bg-primary p-2 text-neutralWhite"
            href={'/resumo/planejamento/categoria'}
          >
            Categorias
          </Link>
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
