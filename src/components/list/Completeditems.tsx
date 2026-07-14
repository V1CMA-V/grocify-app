import { useGroceryStore } from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Pressable, Text, View } from 'react-native'

const Completeditems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore()

  const completedItems = items.filter((item) => item.purchased)

  if (completedItems.length === 0) return null

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed Items
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => togglePurchased(item.id)}
              className="h-6 w-6 items-center justify-center rounded-full bg-success"
            >
              <FontAwesome name="check" size={12} color="white" />
            </Pressable>

            <Text className="text-base text-muted-foreground line-through">
              {item.name}
            </Text>
          </View>

          <Pressable
            className="h-8 w-8 items-center justify-center rounded-xl bg-destructive"
            onPress={async () => removeItem(item.id)}
          >
            <FontAwesome name="trash" size={12} color="#d55f58" />
          </Pressable>
        </View>
      ))}
    </View>
  )
}

export default Completeditems
