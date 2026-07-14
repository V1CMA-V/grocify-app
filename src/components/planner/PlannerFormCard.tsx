import {
  GroceryCategory,
  GroceryPriority,
  useGroceryStore,
} from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useColorScheme } from 'nativewind'
import { ComponentProps, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

const categories: GroceryCategory[] = [
  'Produce',
  'Dairy',
  'Bakery',
  'Pantry',
  'Snacks',
]

const priorities: GroceryPriority[] = ['low', 'medium', 'high']

const categoryIcons: Record<
  GroceryCategory,
  ComponentProps<typeof FontAwesome5>['name']
> = {
  Produce: 'leaf',
  Dairy: 'cheese',
  Bakery: 'bread-slice',
  Pantry: 'utensils',
  Snacks: 'cookie',
}

const priorityIcons: Record<
  GroceryPriority,
  ComponentProps<typeof FontAwesome5>['name']
> = {
  low: 'seedling',
  medium: 'compass',
  high: 'bolt',
}

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore()

  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'
  const secondaryIconColor = isDark ? 'hsl(138 30% 83%)' : 'hsl(146 55% 24%)'
  const mutedIconColor = isDark ? 'hsl(140 17% 68%)' : 'hsl(146 26% 40%)'

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [category, setCategory] = useState<GroceryCategory>('Produce')
  const [priority, setPriority] = useState<GroceryPriority>('medium')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canCreate = name.trim().length > 0 && !isSubmitting

  const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ''))
  }

  const createItem = async () => {
    setIsSubmitting(true)

    const created = await addItem({
      name: name.trim(),
      category,
      priority,
      quantity: Number(quantity),
    })

    setIsSubmitting(false)

    // Keep the form as-is on failure so the user can retry without retyping
    if (!created) return

    setName('')
    setQuantity('1')
    setCategory('Produce')
    setPriority('medium')
  }

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      {/* Item Name */}
      <Text className="text-sm font-semibold text-foreground">Item name</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome name="shopping-bag" size={13} color={mutedIconColor} />

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor={mutedIconColor}
        />
      </View>

      {/* Quantity */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Quantity
      </Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome name="hashtag" size={13} color={mutedIconColor} />

        <TextInput
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          returnKeyType="done"
          placeholder="1"
          placeholderTextColor={mutedIconColor}
          className="ml-3 flex-1 text-base text-foreground"
        />
      </View>

      {/* Categories */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Category
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {categories.map((option) => {
          const active = category === option
          return (
            <Pressable
              key={option}
              onPress={() => setCategory(option)}
              className={`flex-row items-center rounded-full px-4 py-2 active:opacity-80 ${active ? 'bg-primary' : 'bg-secondary'}`}
            >
              <FontAwesome5
                name={categoryIcons[option]}
                size={12}
                solid
                color={active ? 'white' : secondaryIconColor}
              />
              <Text
                className={`ml-2 text-sm font-semibold ${active ? 'text-primary-foreground' : 'text-secondary-foreground'}`}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* Priority */}
      <Text className="mt-4 text-sm font-semibold text-foreground">
        Priority
      </Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {priorities.map((option) => {
          const active = option === priority
          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-row items-center rounded-full px-4 py-2 active:opacity-80 ${active ? 'bg-primary' : 'bg-secondary'}`}
            >
              <FontAwesome5
                name={priorityIcons[option]}
                size={12}
                solid
                color={active ? 'white' : secondaryIconColor}
              />
              <Text
                className={`ml-2 text-sm font-semibold capitalize ${active ? 'text-primary-foreground' : 'text-secondary-foreground'}`}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 active:opacity-90 ${canCreate ? 'bg-primary' : 'bg-muted'}`}
        onPress={createItem}
        disabled={!canCreate}
      >
        <FontAwesome5
          name="plus"
          size={12}
          color={canCreate ? 'white' : mutedIconColor}
        />
        <Text
          className={`ml-2 text-base font-semibold ${canCreate ? 'text-primary-foreground' : 'text-muted-foreground'}`}
        >
          {isSubmitting ? 'Adding...' : 'Add to Grocery List'}
        </Text>
      </Pressable>

      {error ? (
        <View className="mt-3 rounded-2xl border border-destructive-foreground/30 bg-destructive px-3 py-2">
          <Text className="text-center text-sm font-medium text-destructive-foreground">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export default PlannerFormCard
