import { Link } from 'expo-router'
import { LinkProps } from 'expo-router/build/link/Link'
import { ReactNode } from 'react'
import { Text, TextProps, TouchableOpacity } from 'react-native'

interface ILinkButton extends LinkProps {
  children: ReactNode
}

interface ILinkText extends TextProps {
  children: ReactNode
}

interface ILinkIcon {
  children: ReactNode
}

const LinkButton = ({ children, ...rest }: ILinkButton) => {
  return (
    <Link asChild {...rest}>
      <TouchableOpacity
        className="h-12 w-full flex-row items-center justify-center font-body text-base text-slate-300"
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    </Link>
  )
}

const LinkText = ({ children, ...rest }: ILinkText) => {
  return (
    <Text {...rest} className="mx-2 font-heading text-base text-slate-300">
      {children}
    </Text>
  )
}

const LinkIcon = ({ children }: ILinkIcon) => {
  return children
}

LinkButton.Text = LinkText
LinkButton.Icon = LinkIcon

export { LinkButton }
