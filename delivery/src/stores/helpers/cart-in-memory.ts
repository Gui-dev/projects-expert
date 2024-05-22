import { ProductProps } from '@/utils/data/products'
import { IProductCartProps } from '../cart-store'

export const add = (
  products: IProductCartProps[],
  new_product: ProductProps,
) => {
  const existing_product = products.find(({ id }) => new_product.id === id)
  if (existing_product) {
    return products.map((product) =>
      product.id === existing_product.id
        ? { ...product, quantity: product.quantity + 1 }
        : product,
    )
  }

  return [...products, { ...new_product, quantity: 1 }]
}
