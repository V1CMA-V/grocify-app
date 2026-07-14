import CompletedItems from '@/components/list/CompletedItems'
import ListHeroCard from '@/components/list/ListHeroCard'
import PendingItemCard from '@/components/list/PendingItemCard'
import TabScreenBackground from '@/components/tabsScreenBackground'
import { useGroceryStore } from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useColorScheme } from 'nativewind'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ListScreen() {
  const { items, isLoading, error, loadItems } = useGroceryStore()
  const insets = useSafeAreaInsets()

  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  const primaryColor = isDark ? 'hsl(142 70% 54%)' : 'hsl(147 75% 33%)'
  const mutedIconColor = isDark ? 'hsl(140 17% 68%)' : 'hsl(146 26% 40%)'

  const pendingItems = items.filter((item) => !item.purchased)
  const isFirstLoad = isLoading && items.length === 0

  // iOS gets the top inset from contentInsetAdjustmentBehavior; Android does not
  const topPadding = process.env.EXPO_OS === 'android' ? insets.top + 12 : 12

  return (
    <View className="flex-1 bg-background">
      <TabScreenBackground />

      <Animated.FlatList
        data={pendingItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PendingItemCard item={item} />}
        itemLayoutAnimation={LinearTransition.duration(250)}
        contentContainerStyle={{ padding: 20, paddingTop: topPadding, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ gap: 14 }}>
            <ListHeroCard />
            <View className="flex-row items-center justify-between px-1">
              <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
                Shopping items
              </Text>
              <Text className="text-sm text-muted-foreground">
                {pendingItems.length} active
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          isFirstLoad ? (
            <View className="items-center py-12">
              <ActivityIndicator color={primaryColor} />
            </View>
          ) : error ? (
            <View className="items-center gap-3 rounded-3xl border border-border bg-card p-6">
              <Text className="text-base font-semibold text-card-foreground">
                {"Couldn't load your list"}
              </Text>
              <Text className="text-center text-sm text-muted-foreground">
                {error}
              </Text>
              <Pressable
                className="rounded-full bg-primary px-6 py-2.5 active:opacity-90"
                onPress={() => loadItems()}
              >
                <Text className="font-semibold text-primary-foreground">
                  Try again
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="items-center gap-2 rounded-3xl border border-dashed border-border bg-card/60 px-6 py-10">
              <FontAwesome
                name="shopping-basket"
                size={28}
                color={mutedIconColor}
              />
              <Text className="mt-2 text-base font-semibold text-card-foreground">
                {items.length > 0 ? 'All done!' : 'No items yet'}
              </Text>
              <Text className="text-center text-sm text-muted-foreground">
                {items.length > 0
                  ? 'Everything on your list is checked off.'
                  : 'Add your first grocery item from the Planner tab.'}
              </Text>
            </View>
          )
        }
        ListFooterComponent={<CompletedItems />}
      />
    </View>
  )
}
