import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper'
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import { getUser, initStorage } from './src/utils/storage';
import { getContactsPermissionsState } from './src/utils/permissions';
import { mainTheme } from './src/theme/theme';
import HomeTabNavigator from './src/navigators/HomeTabNavigator';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import UserCreationNavigator from './src/navigators/AccountCreationNavigator';


const Stack = createStackNavigator();

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(true);
  const [isLoggedIn, setLoginState] = useState(true);


  useEffect(() => {
    const checkContactsPermission = async () => {
      setHasPermission(await getContactsPermissionsState())
    };
    checkContactsPermission();
    const checkUserState = async () => {
      const user = await getUser();
      if (user) {
        setLoginState(true);
      } else{
        setLoginState(false);
      }
    } 

    checkUserState();
    initStorage()
  }, [])


  return (
    <RecoilRoot>
      <PaperProvider theme={mainTheme}>
        <NavigationContainer theme={mainTheme} >
          <Stack.Navigator screenOptions={{
            headerShown: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 500 } },
              close: { animation: 'timing', config: { duration: 500 } },
            },
          }}>
            {isLoggedIn ? <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> : <Stack.Screen name="UserCreation" component={UserCreationNavigator} />}
            <Stack.Screen name="Home" component={HomeTabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  )
}
