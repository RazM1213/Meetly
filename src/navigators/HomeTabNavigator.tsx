import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DatesScreen } from '../screens';
import PoolsNavigator from './PoolsNavigator';
import MatchesScreen from '../screens/MatchesScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator 
            shifting={false}
        >
            <Tab.Screen
                name="Dates"
                component={DatesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar-check" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Matches"
                component={MatchesScreen}
                options={{
                    tabBarBadge:2,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="handshake" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Pools"
                component={PoolsNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account-group" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};


export default HomeTabNavigator;