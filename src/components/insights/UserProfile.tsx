import { useAuth, useUser } from '@clerk/expo'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { Image } from 'expo-image'
import { useColorScheme } from 'nativewind'
import { Alert, Pressable, Text, View } from 'react-native'

const UserProfile = () => {
  const { signOut } = useAuth()
  const { user } = useUser()

  const { colorScheme } = useColorScheme()
  const destructiveIconColor =
    colorScheme === 'dark' ? 'hsl(7 85% 76%)' : 'hsl(6 74% 54%)'

  const email = user?.primaryEmailAddress?.emailAddress
  const displayName = user?.fullName || email?.split('@')[0]

  const confirmSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => signOut() },
    ])
  }

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-center gap-3">
        <View className="size-12 overflow-hidden rounded-full">
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View className="flex-1">
          <Text className="text-xs uppercase tracking-[1px] text-muted-foreground">
            Signed in as
          </Text>
          <Text className="mt-1 text-lg font-bold text-foreground">
            {displayName}
          </Text>
          <Text className="text-sm text-muted-foreground" selectable>
            {email}
          </Text>
        </View>

        <Pressable
          onPress={confirmSignOut}
          hitSlop={6}
          className="h-9 w-9 items-center justify-center rounded-xl bg-destructive active:opacity-70"
        >
          <FontAwesome6
            name="right-from-bracket"
            size={13}
            color={destructiveIconColor}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default UserProfile
