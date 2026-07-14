import { hapticImpact } from '@/lib/haptics'
import { useGroceryStore } from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useColorScheme } from 'nativewind'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated'

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore()

  const { colorScheme } = useColorScheme()
  const destructiveIconColor =
    colorScheme === 'dark' ? 'hsl(7 85% 76%)' : 'hsl(6 74% 54%)'

  const completedItems = items.filter((item) => item.purchased)

  if (completedItems.length === 0) return null

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      layout={LinearTransition.duration(250)}
    >
      <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
          Completed Items
        </Text>

        {completedItems.map((item) => (
          <Animated.View
            key={item.id}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(150)}
            layout={LinearTransition.duration(250)}
          >
            <View className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">
              <View className="flex-row items-center gap-2">
                <Pressable
                  onPress={() => {
                    hapticImpact()
                    togglePurchased(item.id)
                  }}
                  className="h-6 w-6 items-center justify-center rounded-full bg-success active:opacity-70"
                  hitSlop={10}
                >
                  <FontAwesome name="check" size={12} color="white" />
                </Pressable>

                <Text className="text-base text-muted-foreground line-through">
                  {item.name}
                </Text>
              </View>

              <Pressable
                className="h-8 w-8 items-center justify-center rounded-xl bg-destructive active:opacity-70"
                hitSlop={6}
                onPress={() => removeItem(item.id)}
              >
                <FontAwesome
                  name="trash"
                  size={12}
                  color={destructiveIconColor}
                />
              </Pressable>
            </View>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  )
}

export default CompletedItems
