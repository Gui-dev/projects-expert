import { Link } from 'expo-router'
import { LinkProps } from 'expo-router/build/link/Link'
import { ReactNode } from 'react'
import { Text, TextProps, TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'

interface ILinkButton extends LinkProps {
  children: ReactNode
  className?: string
}

interface ILinkText extends TextProps {
  children: ReactNode
  className?: string
}

interface ILinkIcon {
  children: ReactNode
}

const LinkButton = ({ children, className, ...rest }: ILinkButton) => {
  return (
    <Link asChild {...rest}>
      <TouchableOpacity
        className={twMerge(
          'h-12 w-full flex-row items-center justify-center font-body text-base text-slate-300',
          className,
        )}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    </Link>
  )
}

const LinkText = ({ children, className, ...rest }: ILinkText) => {
  return (
    <Text
      {...rest}
      className={twMerge(
        'mx-2 font-heading text-base text-slate-300',
        className,
      )}
    >
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
