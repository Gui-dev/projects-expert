/* eslint-disable prettier/prettier */
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

export const remove = (products: IProductCartProps[], product_id: string) => {
  const update_products = products.map((product) =>
    product.id === product_id
      ? {
        ...product,
        quantity: product.quantity > 1 ? product.quantity - 1 : 0,
      }
      : product,
  )

  return update_products.filter((product) => product.quantity > 0)
}
