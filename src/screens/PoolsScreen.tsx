import { Text, View } from "react-native";

export function PoolsScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Pools')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Pools Screen</Text>
        </View>
    )
}