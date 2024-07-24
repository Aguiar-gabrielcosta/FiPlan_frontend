import { fecthExpensesPerCategory } from '@/app/lib/service/apiConsumer'
import Section from '../../section'
import ExpenseInfo from './expenseInfo'

// const data = [
//   {
//     category: 'Alimentação',
//     expenses: 3500,
//     budget: 3500,
//     porcentageOfBudget: 1,
//   },
//   {
//     category: 'Cabelereiro',
//     expenses: 200,
//     budget: 200,
//     porcentageOfBudget: 1,
//   },
//   {
//     category: 'iFood',
//     expenses: 560,
//     budget: 300,
//     porcentageOfBudget: 0.7,
//   },
//   {
//     category: 'Uber',
//     expenses: 300,
//     budget: 300,
//     porcentageOfBudget: 0.7,
//   },
//   {
//     category: 'Combustível',
//     expenses: 400,
//     budget: 1000,
//     porcentageOfBudget: 0.4,
//   },
//   {
//     category: 'Outros',
//     expenses: 150,
//     budget: 700,
//     porcentageOfBudget: 0.4,
//   },
//   {
//     category: 'Outros',
//     expenses: 150,
//     budget: 700,
//     porcentageOfBudget: 0.4,
//   },
//   {
//     category: 'Outros',
//     expenses: 150,
//     budget: 700,
//     porcentageOfBudget: 0.4,
//   },
//   {
//     category: 'Outros',
//     expenses: 150,
//     budget: 700,
//     porcentageOfBudget: 0.4,
//   },
// ]

export default async function ExpensesByCategory({
  planId,
}: {
  planId: string
}) {
  const expensesByCategory = await fecthExpensesPerCategory(planId)

  return (
    <Section title="Gastos por categoria" width="fit">
      <div className="flex flex-col gap-2">
        {expensesByCategory.map((item) => (
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
