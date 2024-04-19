/**
 * Configuration for pagination.
 */
export const paginationConfig = {
  perPage: 1,
}

/**
 * Configuration for sorting.
 */
export const sortingConfig = {
  default: '-price',
  options: [
    {
      label: 'Highest price',
      value: '-price',
    },
    {
      label: 'Lowest price',
      value: 'price',
    },
  ],
}

/**
 * Configuration for product statuses.
 */
export const statusesConfig = {
  default: 'draft',
  statuses: [
    {
      label: 'Draft',
      value: 'draft',
    },
    {
      label: 'Published',
      value: 'published',
    },
  ],
}

/**
 * Configuration for product categories.
 */
export const categoriesConfig = {
  default: 'phones',
  categories: [
    {
      label: 'Phones',
      value: 'phones',
    },
    {
      label: 'Tablets',
      value: 'tablet',
    },
    {
      label: 'Laptops',
      value: 'laptops',
    },
  ],
}

/**
 * Factory to generate a default model for items.
 * @returns Default model object.
 */
export function defaultModel() {
  return {
    name: '',
    category: categoriesConfig.default,
    description: '',
    price: 0,
    status: 'draft',
  }
}
