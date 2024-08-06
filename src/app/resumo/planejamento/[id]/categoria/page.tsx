export default function EditCategory({ params }: { params: { id: string } }) {
  const categoryId = params.id

  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      {categoryId}
    </div>
  )
}
