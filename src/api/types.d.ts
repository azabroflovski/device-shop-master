type ProductStatus = 'draft' | 'published'

interface ProductItem {
  id?: number
  name: string
  description: string
  category: string
  year: number | string
  price: number | null
  status: ProductStatus
  createdAt?: Date

  displayPrice?: string
  displayCreatedAt?: string
}
