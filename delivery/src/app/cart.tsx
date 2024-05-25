import { Alert, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Feather } from '@expo/vector-icons'

import { CartEmpty } from '@/components/cart-empty'
import { Header } from '@/components/header'
import { useCartStore } from '@/stores/cart-store'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'
import colors from 'tailwindcss/colors'
import { ProductProps } from '@/utils/data/products'

const Cart = () => {
  const { products, remove } = useCartStore()

  const total = formatCurrency(
    products.reduce((total, product) => {
      const result = total + product.price * product.quantity
      return result
    }, 0),
  )

  const handleProductRemove = (product: ProductProps) => {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => remove(product.id),
      },
    ])
  }

  if (products.length === 0) {
    return <CartEmpty />
  }

  return (
    <View className="flex-1">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraHeight={100}
      >
        <ScrollView>
          <View className="flex-1 p-5">
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  product={product}
                  onPress={() => handleProductRemove(product)}
                />
              )
            })}
          </View>

          <View className="w-full flex-1 bg-slate-950 pb-6">
            <View className="mb-6 mt-2 flex-row items-center gap-2 px-5">
              <Text className="font-subtitle text-xl text-slate-100">
                Total:
              </Text>
              <Text className="font-heading text-2xl text-lime-400">
                {total}
              </Text>
            </View>
          </View>
          <View className="gap-5 px-5 pb-10">
            <Input placeholder="Informe o endereço de entrega com: rua, bairro, CEP e número" />
            <Button>
              <Button.Icon>
                <Feather name="arrow-right-circle" size={20} />
              </Button.Icon>
              <Button.Text>Enviar pedido</Button.Text>
            </Button>

            <LinkButton href="/">
              <Feather
                name="arrow-left-circle"
                size={20}
                color={colors.slate[100]}
              />
              <LinkButton.Text>Continuar comprando</LinkButton.Text>
            </LinkButton>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Cart
