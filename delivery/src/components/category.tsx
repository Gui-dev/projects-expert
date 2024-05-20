import { Pressable, PressableProps, Text } from 'react-native'
import { clsx } from 'clsx'

interface ICategory extends PressableProps {
  title: string
  is_selected?: boolean
}

export const Category = ({
  title,
  is_selected = false,
  ...rest
}: ICategory) => {
  return (
    <Pressable
      className={clsx(
        'justify-center rounded-md bg-slate-800 px-4',
        is_selected && 'border-2 border-lime-300',
      )}
      {...rest}
    >
      <Text className="font-subtitle text-sm text-slate-100">{title}</Text>
    </Pressable>
  )
}
