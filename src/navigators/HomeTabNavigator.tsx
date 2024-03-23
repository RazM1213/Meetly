import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DatesScreen } from '../screens';
import { COLORS } from '../theme/theme';
import PoolsNavigator from './PoolsNavigator';
import { useTheme } from 'react-native-paper';
import MatchesScreen from '../screens/MatchesScreen';

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => {
    return (
        <Tab.Navigator 
            // barStyle={styles.tabBarStyle}
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

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: COLORS.primaryOrangeHex,
    },
    active: {
        // backgroundColor: COLORS.primaryWhiteHex
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