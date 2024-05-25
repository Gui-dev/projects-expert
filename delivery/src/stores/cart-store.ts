import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStore from '@react-native-async-storage/async-storage'

import { ProductProps } from '@/utils/data/products'
import * as cartInMemory from './helpers/cart-in-memory'

export interface IProductCartProps extends ProductProps {
  quantity: number
}

interface ICartProps {
  products: IProductCartProps[]
  add: (product: ProductProps) => void
  remove: (product_id: string) => void
  clearCart: () => void
}

export const useCartStore = create(
  persist<ICartProps>(
    (set) => {
      return {
        products: [],
        add: (product: ProductProps) =>
          set((state) => ({
            products: cartInMemory.add(state.products, product),
          })),
        remove: (product_id: string) =>
          set((state) => ({
            products: cartInMemory.remove(state.products, product_id),
          })),
        clearCart: () => set(() => ({ products: [] })),
      }
    },
    {
      name: 'delivery_cart',
      storage: createJSONStorage(() => AsyncStore),
    },
  ),
)
