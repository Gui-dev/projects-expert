import { create } from 'zustand'

import { ProductProps } from '@/utils/data/products'
import * as cartInMemory from './helpers/cart-in-memory'

export interface IProductCartProps extends ProductProps {
  quantity: number
}

interface ICartProps {
  products: IProductCartProps[]
  add: (product: ProductProps) => void
}

export const useCartStore = create<ICartProps>((set) => {
  return {
    products: [],
    add: (product: ProductProps) =>
      set((state) => ({
        products: cartInMemory.add(state.products, product),
      })),
  }
})
