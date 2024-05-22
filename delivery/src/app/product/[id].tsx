import { Image, Text, View } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { Button } from '@/components/button'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import { LinkButton } from '@/components/link-button'
import { useCartStore } from '@/stores/cart-store'

const Product = () => {
  const { add } = useCartStore()
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const product = PRODUCTS.filter((item) => item.id === id)[0]
  const price_formatted = formatCurrency(product.price)

  const handleAddToCart = () => {
    add(product)
    navigation.goBack()
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        alt={product.title}
        className="h-52 w-full"
        resizeMode="cover"
      />
      <View className="mt-8 flex-1 p-5">
        <Text className="font-heading text-2xl text-lime-400">
          {price_formatted}
        </Text>
        <Text className="mb-6 font-body text-base leading-6 text-slate-400">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient, index) => {
          return (
            <Text
              key={String(index)}
              className="font-body text-base leading-6 text-slate-300"
            >
              {'\u2022'} {ingredient}
            </Text>
          )
        })}
      </View>

      <View className="gap-5 p-5 pb-8">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>
        <LinkButton href="/">
          <LinkButton.Icon>
            <Feather name="chevron-left" size={20} color={colors.slate[300]} />
          </LinkButton.Icon>
          <LinkButton.Text>Voltar ao cardápio</LinkButton.Text>
        </LinkButton>
      </View>
    </View>
  )
}

export default Product
