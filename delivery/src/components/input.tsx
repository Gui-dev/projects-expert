import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge'
import colors from 'tailwindcss/colors'

interface IInputProps extends TextInputProps {
  className?: string
}

export const Input = ({ className, ...rest }: IInputProps) => {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      {...rest}
      placeholderTextColor={colors.slate[400]}
      className={twMerge(
        'h-32 rounded-md bg-slate-800 px-5 py-3 font-body text-sm text-slate-100',
        className,
      )}
    />
  )
}
