// WelcomeScreen.tsx
import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useUser } from '../core/hooks/useUser';

export function WelcomeScreen({ navigation }: any) {
    const {user} = useUser();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.text}>Welcome {user?.firstName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e66500',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
});

export default WelcomeScreen;
