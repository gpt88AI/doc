import catalog from './catalog.json'

export type UserManualItem = (typeof catalog)[number]

export function getUserManualItems() {
  return catalog
}

export function getUserManualItem(slug: string) {
  return catalog.find(item => item.slug === slug)
}
