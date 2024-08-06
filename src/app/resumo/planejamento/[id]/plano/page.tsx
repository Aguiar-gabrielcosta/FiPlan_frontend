export default function EditPlan({ params }: { params: { id: string } }) {
  const planId = params.id

  return <div>Editar Plano {planId}</div>
}
