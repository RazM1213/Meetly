import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import * as Contacts from 'expo-contacts';

export function ContactsPermissionPopup({ visible, onRequestClose, navigation }: any) {

    const handleRequestPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate('Dates' as never);
        } else {
            alert('Permission to access contacts is required to use the app.');
        }
    };

    return (
        <Modal visible={visible} onDismiss={onRequestClose} contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Meetly App</Text>
                <Text style={styles.text}>
                    To proceed, please allow access to your contacts. Meetly uses this information to create meetings with mutual intent and availability.
                </Text>
                <Button mode="contained" onPress={handleRequestPermission}>
                    Allow Contacts Access
                </Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        margin: 40,
        borderRadius: 10,
    },
    innerContainer: {
        alignItems: 'center',
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

export default ContactsPermissionPopup;
