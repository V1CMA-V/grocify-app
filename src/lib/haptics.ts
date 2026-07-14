import * as Haptics from 'expo-haptics'

const isNative = process.env.EXPO_OS !== 'web'

/** Light tap for small state changes (toggles, checks). */
export const hapticImpact = () => {
  if (isNative) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

/** System notification feedback for operation outcomes. */
export const hapticNotify = (type: 'success' | 'error') => {
  if (isNative) {
    Haptics.notificationAsync(
      type === 'success'
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    )
  }
}
