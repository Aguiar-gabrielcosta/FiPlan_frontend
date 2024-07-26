import TransactionForm from '@/src/components/transacao/transactionForm'
import { Api } from '@/src/lib/service/api'

export default async function Transacao() {
  const plans = await Api.plans()
  const categories = await Api.categories()

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <TransactionForm plans={plans} categories={categories} />
    </div>
  )
}
