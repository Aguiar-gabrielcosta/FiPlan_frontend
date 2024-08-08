import Loading from '@/src/components/global/loading'
import TransactionInfo from '@/src/components/historico/transactionInfo'
import { Suspense } from 'react'

export default function Historico({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const page = searchParams?.page || '1'
  return (
    <Suspense key={page} fallback={<Loading />}>
      <TransactionInfo page={page} />
    </Suspense>
  )
}
