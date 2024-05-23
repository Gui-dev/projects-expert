import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { LinkButton } from './link-button'
import colors from 'tailwindcss/colors'
import { Header } from './header'

export const CartEmpty = () => {
  return (
    <View className="flex-1">
      <Header title="Seu carrinho" />
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="font-heading text-xl text-slate-100">
          Carrinho vazio
        </Text>
        <LinkButton href="/">
          <LinkButton.Icon>
            <Ionicons
              name="fast-food-outline"
              size={20}
              color={colors.lime[300]}
            />
          </LinkButton.Icon>
          <LinkButton.Text className="font-heading text-xl text-lime-500">
            Começar a comprar
          </LinkButton.Text>
        </LinkButton>
      </View>
    </View>
  )
}
