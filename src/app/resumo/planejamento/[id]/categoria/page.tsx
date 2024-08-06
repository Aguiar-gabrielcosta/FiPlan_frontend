import EditCategoryForm from '@/src/components/planejamento/forms/editCategoryForm'
import { Api } from '@/src/lib/service/api'

export default async function EditCategory({
  params,
}: {
  params: { id: string }
}) {
  const categoryId = params.id

  const category = await Api.categoryById(parseInt(categoryId))

  if (!category.data) {
    return (
      <p className="mx-auto mt-32 text-center text-lg font-medium text-alertRed">
        {category.message}
      </p>
    )
  }

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      <EditCategoryForm category={category.data} />
    </div>
  )
}
