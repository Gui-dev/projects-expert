import { SafeAreaView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter'

import '@/assets/styles/globals.css'
import { Loading } from '@/components/loading'

const Layout = () => {
  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  if (!isFontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900 pt-8">
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Slot />
    </SafeAreaView>
  )
}

export default Layout
