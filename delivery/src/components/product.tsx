import React, { forwardRef } from 'react'
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface IProduct extends TouchableOpacityProps {
  product: {
    id: string
    title: string
    price: number
    description: string
    cover: any
    thumbnail: ImageProps
    ingredients: string[]
    quantity?: number
  }
}

export const Product = forwardRef<TouchableOpacity, IProduct>(
  ({ product, ...rest }, ref) => {
    return (
      <TouchableOpacity
        className="w-full flex-row items-center pb-4"
        {...rest}
        activeOpacity={0.7}
        ref={ref}
      >
        <Image
          source={product.thumbnail}
          alt={product.title}
          className="h-20 w-20 rounded-md"
        />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="font-subtitle text-base text-slate-100">
              {product.title}
            </Text>
            {product.quantity && (
              <Text className="font-subtitle text-sm text-slate-400">
                x {product.quantity}
              </Text>
            )}
          </View>
          <Text className="mt-0.5 text-xs leading-5 text-slate-400">
            {product.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)
