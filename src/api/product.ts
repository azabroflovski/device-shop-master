import { $api } from '@/api/client'

class Product {
    async all() {
        return $api('/products').json()
    }
}

export const $product = new Product()
