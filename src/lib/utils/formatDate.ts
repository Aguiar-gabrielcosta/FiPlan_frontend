export default function formatDate(date: string): string {
  console.log(date)

  return new Date(date).toLocaleDateString('pt-br')
}
