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

export function defaultModel() {
  return {
    name: '',
    category: categoriesConfig.default,
    description: '',
    price: 0,
    status: 'draft',
  }
}
