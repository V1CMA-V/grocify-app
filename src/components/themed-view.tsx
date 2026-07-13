import { useColorScheme, View, type ViewProps } from 'react-native'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const theme = useColorScheme() ?? 'light'
  const backgroundColor =
    theme === 'light' ? (lightColor ?? '#fff') : (darkColor ?? '#151718')

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
