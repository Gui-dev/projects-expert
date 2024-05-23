import { Image, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import logo from '@/assets/logo.png'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

interface IHeader {
  title: string
  cart_quantity?: number
}

export const Header = ({ title, cart_quantity = 0 }: IHeader) => {
  return (
    <View className="w-full flex-row items-center border-b border-slate-700 pb-5">
      <View className="flex-1 px-5">
        <Image source={logo} alt="Delivery Logo" className="h-6 w-32" />
        <Text className="mt-2 font-heading text-xl text-zinc-100">{title}</Text>
      </View>
      {cart_quantity > 0 && (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative mr-8" activeOpacity={0.6}>
            <View className="absolute -right-3 -top-1.5 z-10 h-4 w-4 items-center justify-center rounded-full bg-lime-300">
              <Text className="font-bold text-xs text-slate-900">
                {cart_quantity}
              </Text>
            </View>
            <Feather name="shopping-bag" color={colors.slate[100]} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}
