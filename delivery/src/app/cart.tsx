import { useState } from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'

import { CartEmpty } from '@/components/cart-empty'
import { Header } from '@/components/header'
import { useCartStore } from '@/stores/cart-store'
import { Product } from '@/components/product'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { LinkButton } from '@/components/link-button'
import { ProductProps } from '@/utils/data/products'
import { useNavigation } from 'expo-router'

const PHONE_NUMBER = ''

const Cart = () => {
  const [address, setAddress] = useState('')
  const { clearCart, products, remove } = useCartStore()
  const navigation = useNavigation()

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

  const handleOrder = () => {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe o endereço da entrega')
    }
    const orders = products
      .map((product) => `\n ${product.quantity} x ${product.title}`)
      .join('')
    const message = `
      🍔 NOVO PEDIDO 
      \n Entregar em: ${address}
      ${orders}
      \n Valor Total: ${total}
    `
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )
    clearCart()
    navigation.goBack()
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
            <Input
              placeholder="Informe o endereço de entrega com: rua, bairro, CEP e número"
              value={address}
              onChangeText={setAddress}
              blurOnSubmit={true}
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
            <Button onPress={handleOrder}>
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
