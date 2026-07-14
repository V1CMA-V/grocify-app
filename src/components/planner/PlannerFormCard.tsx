import {
  GroceryCategory,
  GroceryPriority,
  useGroceryStore,
} from '@/store/grocery-store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { useColorScheme } from 'nativewind'
import { ComponentProps, useState } from 'react'
import { Alert, Pressable, Text, TextInput, View } from 'react-native'

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

const PlannerFormCard = () => {
  const { error, addItem } = useGroceryStore()

  const { colorScheme } = useColorScheme()
  const secondaryIconColor =
    colorScheme === 'dark' ? 'hsl(138 30% 83%)' : 'hsl(146 55% 24%)'

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [category, setCategory] = useState<GroceryCategory>('Produce')
  const [priority, setPriority] = useState<GroceryPriority>('medium')

  const canCreate = name.trim().length > 0

  const handleQuantityChange = (value: string) => {
    setQuantity(value.replace(/[^0-9]/g, ''))
  }

  const createItem = async () => {
    await addItem({
      name: name.trim(),
      category,
      priority,
      quantity: Number(quantity),
    })

    // Alert.alert('Success', 'Item added to your grocery list!')

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
        <FontAwesome name="shopping-bag" size={13} color="#5b7567" />

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
          className="ml-3 flex-1 text-base text-foreground"
          placeholderTextColor="#8aa397"
        />
      </View>

      {/* Quantity */}
      <Text className="text-sm font-semibold text-foreground">Quantity</Text>
      <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-3">
        <FontAwesome name="hashtag" size={13} color="#5b7567" />

        <TextInput
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          placeholder="1"
          placeholderTextColor="#8aa397"
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
              className={`flex-row items-center rounded-full px-4 py-2 ${active ? 'bg-primary' : 'bg-secondary'}`}
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
          const icon =
            option === 'high'
              ? 'bolt'
              : option === 'medium'
                ? 'compass'
                : 'seedling'
          return (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              className={`flex-row items-center rounded-full px-4 py-2 ${active ? 'bg-primary' : 'bg-secondary'}`}
            >
              <FontAwesome5
                name={icon}
                size={12}
                solid
                color={active ? 'white' : secondaryIconColor}
              />
              <Text
                className={` text-sm font-semibold capitalize ml-1 ${active ? 'text-primary-foreground' : 'text-secondary-foreground'}`}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <Pressable
        className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 ${canCreate ? 'bg-primary' : 'bg-muted'}`}
        onPress={createItem}
        disabled={!canCreate}
      >
        <FontAwesome5
          name="plus"
          size={12}
          color={canCreate ? 'white' : '#7a9386'}
        />
        <Text
          className={`ml-2 text-base font-semibold ${canCreate ? 'text-primary-foreground' : 'text-muted-foreground'}`}
        >
          Add to Grocery List
        </Text>
      </Pressable>

      {error ? (
        <View className="mt-3 rounded-2xl border border-destructive bg-destructive px-3 py-2">
          <Text className="text-sm text-white text-center uppercase">
            {error}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export default PlannerFormCard
