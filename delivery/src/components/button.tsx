import { ReactNode } from 'react'
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

interface IButton extends TouchableOpacityProps {
  children: ReactNode
}

interface IButtonText extends TextProps {
  children: ReactNode
}

interface IButtonIcon {
  children: ReactNode
}

const Button = ({ children, ...rest }: IButton) => {
  return (
    <TouchableOpacity
      {...rest}
      className="h-12 flex-row items-center justify-center rounded-md bg-lime-400"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  )
}

const ButtonText = ({ children, ...rest }: IButtonText) => {
  return (
    <Text {...rest} className="mx-2 font-heading text-base text-black">
      {children}
    </Text>
  )
}

const ButtonIcon = ({ children }: IButtonIcon) => {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export { Button }
