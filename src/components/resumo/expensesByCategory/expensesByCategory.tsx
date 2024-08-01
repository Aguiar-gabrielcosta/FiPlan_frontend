import { fecthExpensesPerCategory } from '@/src/lib/service/apiConsumer'
import Section from '../../global/section'
import ExpenseInfo from './expenseInfo'

export default async function ExpensesByCategory({
  planId,
}: {
  planId: string
}) {
  const expensesByCategory = await fecthExpensesPerCategory(planId)

  if (!expensesByCategory.data) {
    return (
      <Section title="Gastos por categoria" width="fit">
        <>
          {expensesByCategory.message && (
            <p className="mt-2 text-center text-alertRed">
              {expensesByCategory.message}
            </p>
          )}
        </>
      </Section>
    )
  }

  if (expensesByCategory.data.length === 0) {
    return (
      <Section title="Gastos por categoria" width="fit">
        <>
          <p className="mt-2 text-center">
            Não há categorias e/ou gastos cadastrados.
          </p>
        </>
      </Section>
    )
  }

  return (
    <Section title="Gastos por categoria" width="fit">
      <div className="flex flex-col gap-2">
        {expensesByCategory.data.map((item) => (
          <ExpenseInfo
            key={item.category}
            category={item.category}
            percentage={item.progress}
            acceptable={0.7}
            expense={item.expenses}
          />
        ))}
      </div>
    </Section>
  )
}
