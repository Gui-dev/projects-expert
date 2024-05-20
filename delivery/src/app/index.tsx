import { useState } from 'react'
import { FlatList, View } from 'react-native'

import { CATEGORIES } from '@/utils/data/products'
import { Category } from '@/components/category'
import { Header } from '@/components/header'

const Home = () => {
  const [categorySelected, setCategorySelected] = useState(CATEGORIES[0])

  const handleCategorySelect = (category_selected: string) => {
    setCategorySelected(category_selected)
  }

  return (
    <View className="flex-1">
      <Header title="Faça se pedido" cart_quantity={5} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <Category
              title={item}
              onPress={() => handleCategorySelect(item)}
              is_selected={item === categorySelected}
            />
          )
        }}
        horizontal
        className="mt-5 max-h-10"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />
    </View>
  )
}

export default Home
