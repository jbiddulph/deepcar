import type { Product } from '~/data/products'

export type BasketItem = {
  slug: string
  category: string
  name: string
  price: number
  unit: string
  quantity: number
}

export type Fulfilment = 'collection' | 'delivery'

const STORAGE_KEY = 'deepcar-basket-v1'

export function useBasket() {
  const items = useState<BasketItem[]>('basket-items', () => [])

  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function persist() {
    if (!import.meta.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
  }

  function load() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      items.value = JSON.parse(raw) as BasketItem[]
    } catch {
      items.value = []
    }
  }

  function addProduct(product: Product, quantity = 1) {
    const existing = items.value.find((item) => item.slug === product.slug)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({
        slug: product.slug,
        category: product.category,
        name: product.name,
        price: product.price,
        unit: product.unit,
        quantity,
      })
    }
    persist()
  }

  function setQuantity(slug: string, quantity: number) {
    const item = items.value.find((entry) => entry.slug === slug)
    if (!item) return
    if (quantity <= 0) {
      items.value = items.value.filter((entry) => entry.slug !== slug)
    } else {
      item.quantity = quantity
    }
    persist()
  }

  function remove(slug: string) {
    items.value = items.value.filter((entry) => entry.slug !== slug)
    persist()
  }

  function clear() {
    items.value = []
    persist()
  }

  return {
    items,
    count,
    subtotal,
    load,
    addProduct,
    setQuantity,
    remove,
    clear,
  }
}
