import { StatusBar } from 'expo-status-bar'
import { Slot } from 'expo-router'

import '@/src/assets/styles/globals.css'

const Layout = () => {
  return (
    <>
      <StatusBar style="light" translucent />
      <Slot />
    </>
  )
}

export default Layout
