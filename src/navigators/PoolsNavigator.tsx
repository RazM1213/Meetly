import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { createStackNavigator } from '@react-navigation/stack'
import { EditPoolScreen } from '../screens/EditPoolScreen'
import { PoolsScreen } from '../screens'
import { ContactsScreen } from '../screens/ContactsScreen'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

const PoolsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PoolsScreen" component={PoolsScreen} />
      <Stack.Screen name="EditPoolScreen" component={EditPoolScreen} />
      <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
    </Stack.Navigator>
  )
}

export default PoolsNavigator
