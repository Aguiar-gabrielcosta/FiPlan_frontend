import Section from '../../section'
import ExpensesList from './expensesList'

export default function ExpensesByCategory() {
  return (
    <Section title="Gastos por categoria" width="fit">
      <div className="flex flex-col gap-2">
        <ExpensesList showLess={false} />
      </div>
    </Section>
  )
}
