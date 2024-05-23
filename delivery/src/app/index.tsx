import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Category } from '@/components/category'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { Link } from 'expo-router'
import { useCartStore } from '@/stores/cart-store'

const Home = () => {
  const { products } = useCartStore()
  const [categorySelected, setCategorySelected] = useState(CATEGORIES[0])
  const section_list_ref = useRef<SectionList<ProductProps>>(null)

  const handleCategorySelect = (category_selected: string) => {
    setCategorySelected(category_selected)
    const section_index = CATEGORIES.findIndex(
      (category) => category === category_selected,
    )
    if (section_list_ref.current) {
      section_list_ref.current.scrollToLocation({
        animated: true,
        sectionIndex: section_index,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1">
      <Header title="Faça se pedido" cart_quantity={products.length} />
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
      <SectionList
        ref={section_list_ref}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => {
          return (
            <Link key={item.id} href={`/product/${item.id}`} asChild>
              <Product product={item} />
            </Link>
          )
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Text className="mb-3 mt-8 font-heading text-xl text-slate-100">
              {title}
            </Text>
          )
        }}
        showsVerticalScrollIndicator={false}
        className="flex-1 p-5"
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}

export default Home
