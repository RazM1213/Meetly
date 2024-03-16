import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DatesScreen, EditPoolScreen, PoolsScreen } from '../screens';
import { COLORS } from '../theme/theme';
import PoolsNavigator from './PoolsNavigator';

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator>
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

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default HomeTabNavigator;