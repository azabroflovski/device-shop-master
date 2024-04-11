type ProductStatus = 'draft' | 'published'

interface ProductItem {
    id: number
    name: string
    description: string
    category: string
    price: number
    status: ProductStatus
}
