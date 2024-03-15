import { Text, View } from "react-native";

export function EditPoolScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('EditPool')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Edit Pool Screen</Text>
        </View>
    )
}