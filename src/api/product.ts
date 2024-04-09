import { supabase } from '@/shared/supabase-client'

class Product {
    async all() {
        return supabase
            .from('products')
            .select('*')
            .range(0, 9)
    }
}

export const $product = new Product()
