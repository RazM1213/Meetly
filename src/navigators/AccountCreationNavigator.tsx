import { createStackNavigator } from '@react-navigation/stack'
import UserInfoScreen from '../screens/UserInfoScreen'
import PhoneNumberScreen from '../screens/PhoneNumberScreen'
import OtpVerificationScreen from '../screens/OtpVerificationScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

const Stack = createStackNavigator()

const UserCreationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
      <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
      <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
    </Stack.Navigator>
  )
}

export default UserCreationNavigator
