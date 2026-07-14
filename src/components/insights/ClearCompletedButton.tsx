import { hapticNotify } from '@/lib/haptics'
import { useGroceryStore } from '@/store/grocery-store'
import { Alert, Pressable, Text } from 'react-native'

const ClearCompletedButton = () => {
  const { clearPurchased, items } = useGroceryStore()

  const completedCount = items.filter((item) => item.purchased).length
  const disabled = completedCount === 0

  const confirmClear = () => {
    Alert.alert(
      'Clear completed items',
      `This will remove ${completedCount} completed item${completedCount === 1 ? '' : 's'} from your list.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await clearPurchased()
            hapticNotify(useGroceryStore.getState().error ? 'error' : 'success')
          },
        },
      ],
    )
  }

  return (
    <Pressable
      className={`rounded-2xl py-3 active:opacity-90 ${disabled ? 'bg-muted' : 'bg-primary'}`}
      disabled={disabled}
      onPress={confirmClear}
    >
      <Text
        className={`text-center text-base font-semibold ${disabled ? 'text-muted-foreground' : 'text-primary-foreground'}`}
      >
        {disabled
          ? 'No completed items'
          : `Clear completed items (${completedCount})`}
      </Text>
    </Pressable>
  )
}

export default ClearCompletedButton
