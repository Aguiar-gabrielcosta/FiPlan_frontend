export default function adjustToUTC(date: string) {
  // Horário local
  const localDate = new Date(date)

  // Ajustar a data para UTC
  return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)
}
