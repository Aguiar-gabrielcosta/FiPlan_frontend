import { Api } from '@/src/lib/service/api'
import Section from '../global/section'
import TransactionTable from './transactionTable'

export default async function TransactionInfo({ page }: { page: string }) {
  const currentPage = Number(page)

  const transactions = await Api.transactionPage(currentPage)

  if (!transactions.data) {
    return (
      <Section title="Histórico de Transações">
        <p className="mt-8 h-full text-center text-lg font-medium text-alertRed">
          {transactions.message}
        </p>
      </Section>
    )
  }

  return (
    <Section title="Histórico de Transações">
      <TransactionTable transactions={transactions.data} />
    </Section>
  )
}
