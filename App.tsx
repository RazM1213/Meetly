import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { RecoilRoot } from 'recoil';
import { useEffect, useState } from 'react';
import { initStorage } from './src/utils/storage';
import { getContactsPermissionsState } from './src/utils/permissions';
import PoolsNavigator from './src/navigators/PoolsNavigator';
import HomeTabNavigator from './src/navigators/HomeTabNavigator';


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
          <HomeTabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  )
}
