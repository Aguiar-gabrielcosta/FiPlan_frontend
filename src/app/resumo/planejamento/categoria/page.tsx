import CategoryForm from '@/src/components/planejamento/forms/categoryForm'
import { Api } from '@/src/lib/service/api'

export default async function Categoria() {
  const plans = await Api.plans()

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <CategoryForm plans={plans} />
    </div>
  )
}
