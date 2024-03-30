import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ContactsPermissionPopup from './ContactsPermissionPopup';
import * as Contacts from 'expo-contacts';

const ContactsPermissionWrapper = ({ children }: { children: React.ReactNode }, { navigation }: any) => {
    const [isPermissionGranted, setPermissionGranted] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const checkPermission = async () => {
            const { status } = await Contacts.getPermissionsAsync();
            setPermissionGranted(status === 'granted');
            setPopupVisible(status !== 'granted');
        };
        checkPermission();
    }, []);

    const handleRequestPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        setPermissionGranted(status === 'granted');
        setPopupVisible(false);
    };

    return (
        <View style={styles.container}>
            {isPopupVisible && (
                <ContactsPermissionPopup
                    visible={isPopupVisible}
                    onRequestClose={() => setPopupVisible(false)}
                    onRequestPermission={handleRequestPermission}
                    navigation={navigation}
                />
            )}
            {isPermissionGranted ? children : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ContactsPermissionWrapper;
