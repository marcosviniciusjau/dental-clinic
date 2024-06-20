export function getYear() {
  const date = new Date()
  return date.toLocaleString('pt-BR', { year: 'numeric' })
}
