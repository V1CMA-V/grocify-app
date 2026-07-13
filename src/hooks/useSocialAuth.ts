import { useSSO } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert } from 'react-native'

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null)
  const { startSSOFlow } = useSSO()
  const router = useRouter()

  const handleSocialAuth = async (strategy: 'oauth_google') => {
    if (loadingStrategy) return // guard against multiple simultaneous auth attempts

    setLoadingStrategy(strategy)

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy })

      if (!createdSessionId || !setActive) {
        Alert.alert(
          'Sign-in incomplete',
          'Sign-in was not completed. Please try again.',
        )
        return
      }

      await setActive({ session: createdSessionId })
      router.replace('/')
    } catch (error) {
      console.error('Error during social authentication:', error)
      Alert.alert(
        'Sign-in error',
        'An error occurred during sign-in. Please try again.',
      )
    } finally {
      setLoadingStrategy(null)
    }
  }

  return { handleSocialAuth, loadingStrategy }
}

export default useSocialAuth
