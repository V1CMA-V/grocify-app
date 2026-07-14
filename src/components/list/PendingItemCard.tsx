import { hapticImpact } from '@/lib/haptics'
import { GroceryItem, useGroceryStore } from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useColorScheme } from 'nativewind'
import { Pressable, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated'

const priorityPill = {
  low: { bg: 'bg-priority-low', text: 'text-priority-low-foreground' },
  medium: { bg: 'bg-priority-medium', text: 'text-priority-medium-foreground' },
  high: { bg: 'bg-priority-high', text: 'text-priority-high-foreground' },
}

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore()

  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  const mutedIconColor = isDark ? 'hsl(140 17% 68%)' : 'hsl(146 26% 40%)'
  const destructiveIconColor = isDark ? 'hsl(7 85% 76%)' : 'hsl(6 74% 54%)'

  const pill = priorityPill[item.priority] ?? priorityPill.medium

  return (
    <Animated.View
      entering={FadeInDown.duration(250)}
      exiting={FadeOut.duration(200)}
    >
      <View className="rounded-3xl border border-border bg-card p-4">
        <View className="flex-row items-start gap-3">
          <Pressable
            className="mt-1 size-7 items-center justify-center rounded-full border-2 border-border bg-card active:border-primary active:bg-primary/10"
            hitSlop={10}
            onPress={() => {
              hapticImpact()
              togglePurchased(item.id)
            }}
          />

          <View className="flex-1">
            <View className="flex-row items-center justify-between gap-2">
              <Text className="flex-1 text-lg font-semibold text-card-foreground">
                {item.name}
              </Text>
              <View className={`rounded-full px-3 py-1 ${pill.bg}`}>
                <Text className={`text-xs font-bold uppercase ${pill.text}`}>
                  {item.priority}
                </Text>
              </View>
            </View>

            <View className="mt-2 flex-row items-center gap-2">
              <View className="rounded-full bg-secondary px-3 py-1">
                <Text className="text-xs font-semibold text-secondary-foreground">
                  {item.category}
                </Text>
              </View>
            </View>

            <View className="mt-3 flex-row items-center gap-2">
              <Pressable
                className="h-8 w-8 items-center justify-center rounded-xl border border-input bg-muted active:opacity-70"
                onPress={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
              >
                <FontAwesome name="minus" size={12} color={mutedIconColor} />
              </Pressable>

              <Text className="min-w-9 text-center text-base font-semibold text-foreground">
                {item.quantity}
              </Text>

              <Pressable
                className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted active:opacity-70"
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <FontAwesome name="plus" size={12} color={mutedIconColor} />
              </Pressable>
            </View>
          </View>

          <Pressable
            className="h-9 w-9 items-center justify-center rounded-xl bg-destructive active:opacity-70"
            hitSlop={6}
            onPress={() => removeItem(item.id)}
          >
            <FontAwesome name="trash" size={13} color={destructiveIconColor} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  )
}

export default PendingItemCard
