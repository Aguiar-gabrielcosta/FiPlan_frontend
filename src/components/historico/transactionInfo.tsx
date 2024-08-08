import { Api } from '@/src/lib/service/api'
import Section from '../global/section'
import TransactionTable from './transactionTable'
import Pagination from './pagination'

export default async function TransactionInfo({ page }: { page: string }) {
  const currentPage = Number(page)
  const numberOfPages = await Api.transactionNumberOfPages()
  const transactions = await Api.transactionPage(currentPage)

  if (!transactions.data || !numberOfPages.data) {
    return (
      <Section title="Histórico de Transações">
        <p className="mt-8 h-full text-center text-lg font-medium text-alertRed">
          {transactions.message}
        </p>
      </Section>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Section title="Histórico de Transações">
        <TransactionTable transactions={transactions.data} />
      </Section>
      <Pagination numberOfPages={numberOfPages.data} />
    </div>
  )
}
