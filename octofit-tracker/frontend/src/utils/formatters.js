export function displayName(value) {
  if (!value) return '—'
  if (typeof value === 'string') return value
  return value.name || value.title || value.email || value._id || '—'
}

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? '—'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)
}

export function itemKey(item, index) {
  return item._id || item.id || `${item.name || item.title || 'item'}-${index}`
}