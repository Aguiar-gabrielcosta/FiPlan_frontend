import Section from '../../section'
import ExpenseInfo from './expenseInfo'

const data = [
  {
    category: 'Alimentação',
    expenses: 3500,
    budget: 3500,
    porcentageOfBudget: 1,
  },
  {
    category: 'Cabelereiro',
    expenses: 200,
    budget: 200,
    porcentageOfBudget: 1,
  },
  {
    category: 'iFood',
    expenses: 560,
    budget: 300,
    porcentageOfBudget: 0.7,
  },
  {
    category: 'Uber',
    expenses: 300,
    budget: 300,
    porcentageOfBudget: 0.7,
  },
  {
    category: 'Combustível',
    expenses: 400,
    budget: 1000,
    porcentageOfBudget: 0.4,
  },
  {
    category: 'Outros',
    expenses: 150,
    budget: 700,
    porcentageOfBudget: 0.4,
  },
  {
    category: 'Outros',
    expenses: 150,
    budget: 700,
    porcentageOfBudget: 0.4,
  },
  {
    category: 'Outros',
    expenses: 150,
    budget: 700,
    porcentageOfBudget: 0.4,
  },
  {
    category: 'Outros',
    expenses: 150,
    budget: 700,
    porcentageOfBudget: 0.4,
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ExpensesByCategory({ planId }: { planId: string }) {
  return (
    <Section title="Gastos por categoria" width="fit">
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <ExpenseInfo
            key={item.category}
            category={item.category}
            percentage={item.porcentageOfBudget}
            acceptable={0.7}
            expense={item.expenses}
          />
        ))}
      </div>
    </Section>
  )
}
