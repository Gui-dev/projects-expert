import { ActivityIndicator } from 'react-native'
import colors from 'tailwindcss/colors'

export const Loading = () => {
  return <ActivityIndicator size="large" color={colors.green[500]} />
}
