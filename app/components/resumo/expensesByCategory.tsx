'use client'

import { Suspense, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Section from '../section'
import ExpensesList from './expensesList'
import Loading from '../loading'

export default function ExpensesByCategory() {
  const [showLess, setShowLess] = useState(true)

  return (
    <Section title="Gastos por categoria" width="fit">
      <div className="flex flex-col gap-2">
        <Suspense fallback={<Loading />}>
          <ExpensesList showLess={showLess} />
        </Suspense>
        {showLess ? (
          <button
            className="flex items-center justify-center font-bold text-neutralBlack hover:text-primary"
            onClick={() => setShowLess(false)}
          >
            Mostrar mais
            <ChevronDown />
          </button>
        ) : (
          <button
            className="flex items-center justify-center font-bold text-neutralBlack hover:text-primary"
            onClick={() => setShowLess(true)}
          >
            Mostrar menos
            <ChevronUp />
          </button>
        )}
      </div>
    </Section>
  )
}
