import { useGroceryStore } from '@/store/grocery-store'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { ComponentProps } from 'react'
import { Text, View } from 'react-native'

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: ComponentProps<typeof FontAwesome6>['name']
  label: string
  value: number
}) => (
  <View className="flex-1 rounded-3xl border border-border bg-card p-4">
    <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary">
      <FontAwesome6 name={icon} size={16} color="white" />
    </View>
    <Text className="mt-3 text-xs uppercase tracking-[1px] text-muted-foreground">
      {label}
    </Text>
    <Text
      className="mt-1 text-3xl font-extrabold text-foreground"
      style={{ fontVariant: ['tabular-nums'] }}
    >
      {value}
    </Text>
  </View>
)

const InsightsStatsSection = () => {
  const { items } = useGroceryStore()

  const totalItems = items.length
  const completedItems = items.filter((item) => item.purchased).length
  const pendingItems = totalItems - completedItems

  const completionRate = totalItems
    ? Math.round((completedItems / totalItems) * 100)
    : 0

  return (
    <>
      <View className="flex-row gap-2">
        <StatCard icon="clock" label="Pending" value={pendingItems} />
        <StatCard icon="check" label="Completed" value={completedItems} />
        <StatCard icon="layer-group" label="Total" value={totalItems} />
      </View>

      <View className="rounded-3xl border border-border bg-card p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-medium text-card-foreground">
            Completion rate
          </Text>
          <Text
            className="text-sm font-semibold text-primary"
            style={{ fontVariant: ['tabular-nums'] }}
          >
            {completionRate}%
          </Text>
        </View>

        <View className="mt-3 overflow-hidden rounded-full bg-secondary">
          <View
            className="h-3 rounded-full bg-primary"
            style={{ width: `${Math.max(2, completionRate)}%` }}
          />
        </View>
      </View>
    </>
  )
}

export default InsightsStatsSection
