import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { RecoilRoot } from 'recoil';
import HomeTabNavigator from './src/navigators/HomeTabNavigator';
import { useEffect, useState } from 'react';
import { initStorage } from './src/utils/storage';
import { getContactsPermissionsState } from './src/utils/permissions';
import ContactsPermissionScreen from './src/screens/ContactsPermissionScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(true);

  useEffect(() => {
    const checkContactsPermission = async () => {
      setHasPermission(await getContactsPermissionsState())
    };
    checkContactsPermission();
    initStorage()
  }, [])


  return (
    <RecoilRoot>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {hasPermission ? (
              <Stack.Screen
                name="Home"
                component={HomeTabNavigator}
                options={{ animation: "slide_from_bottom" }}></Stack.Screen>
            ) : (
              <Stack.Screen
                name="ContactsPermission"
                component={ContactsPermissionScreen}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  )
}
