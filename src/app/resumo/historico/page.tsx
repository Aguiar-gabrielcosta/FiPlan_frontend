import TransactionInfo from '@/src/components/historico/transactionInfo'

export default function Historico({
  searchParams,
}: {
  searchParams?: { page?: string }
}) {
  const page = searchParams?.page || '1'

  return <TransactionInfo page={page} />
}
