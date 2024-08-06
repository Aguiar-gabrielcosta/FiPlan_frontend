export default function EditCategory({ params }: { params: { id: string } }) {
  const categoryId = params.id

  return <div>Editar Categoria {categoryId}</div>
}
