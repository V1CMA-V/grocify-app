import ClearCompletedButton from '@/components/insights/ClearCompletedButton'
import InsightsCategorySection from '@/components/insights/InsightsCategorySection'
import InsightsPrioritySection from '@/components/insights/InsightsPrioritySection'
import InsightsStatsSection from '@/components/insights/InsightsStatsSection'
import UserProfile from '@/components/insights/UserProfile'
import TabScreenBackground from '@/components/tabsScreenBackground'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const InsightsScreen = () => {
  const insets = useSafeAreaInsets()

  // iOS gets the top inset from contentInsetAdjustmentBehavior; Android does not
  const topPadding = process.env.EXPO_OS === 'android' ? insets.top + 12 : 12

  return (
    <View className="flex-1 bg-background">
      <TabScreenBackground />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingTop: topPadding, gap: 14 }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <UserProfile />

        <InsightsStatsSection />
        <InsightsCategorySection />
        <InsightsPrioritySection />

        <ClearCompletedButton />
      </ScrollView>
    </View>
  )
}

export default InsightsScreen
