import { useAuth } from '@clerk/expo'
import { Redirect } from 'expo-router'
import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { useColorScheme } from 'nativewind'

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'

  const tabTintColor = isDark ? 'hsl(142 70% 54%)' : 'hsl(147 75% 33%)'
  const tabBarBackground = isDark ? 'hsl(149 27% 12%)' : 'hsl(0 0% 100%)'
  const inactiveColor = isDark ? 'hsl(140 17% 68%)' : 'hsl(146 26% 40%)'
  const indicatorColor = isDark
    ? 'hsla(142, 70%, 54%, 0.18)'
    : 'hsla(147, 75%, 33%, 0.14)'
  const rippleColor = isDark
    ? 'hsla(142, 70%, 54%, 0.12)'
    : 'hsla(147, 75%, 33%, 0.1)'

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />
  }

  return (
    <NativeTabs
      tintColor={tabTintColor}
      backgroundColor={tabBarBackground}
      iconColor={{ default: inactiveColor, selected: tabTintColor }}
      labelStyle={{
        default: { color: inactiveColor },
        selected: { color: tabTintColor, fontWeight: '600' },
      }}
      indicatorColor={indicatorColor}
      rippleColor={rippleColor}
      labelVisibilityMode="labeled"
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>List</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'list.bullet.clipboard',
            selected: 'list.bullet.clipboard.fill',
          }}
          md={{ default: 'list', selected: 'checklist' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'plus.circle',
            selected: 'plus.circle.fill',
          }}
          md={{ default: 'add', selected: 'add_circle' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{
            default: 'chart.bar',
            selected: 'chart.bar.fill',
          }}
          md={{ default: 'analytics', selected: 'monitoring' }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
