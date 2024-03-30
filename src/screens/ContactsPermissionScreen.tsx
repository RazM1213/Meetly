import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native'

export function ContactsPermissionScreen({ navigation }: any) {
    const handleRequestPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate('Dates')
        } else {
            alert('Permission to access contacts is required to use the app.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meetly App</Text>
            <Text style={styles.text}>
                To proceed, please allow access to your contacts. Meetly uses this information to create meetings with mutual intent and availability.
            </Text>
            <Button mode="contained" onPress={handleRequestPermission}>
                Allow Contacts Access
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default ContactsPermissionScreen;
