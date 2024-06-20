export function getMonth() {
  const date = new Date()
  return date
    .toLocaleDateString('pt-BR', { month: 'long' })
    .charAt(0)
    .toUpperCase()
    .concat(date.toLocaleDateString('pt-BR', { month: 'long' }).slice(1))
    .split('de')
}
