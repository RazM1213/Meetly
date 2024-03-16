import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { userState } from "../core/recoil/atoms/user";
import { User } from "../core/types";

// TODO: Export all styling to objects - in ALL SCREENS.
export function DatesScreen({ navigation }: any) {
    const user = useRecoilValue<User>(userState);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => navigation.navigate('Pools')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Hello {user.FirstName}</Text>
        </View>
    )
}