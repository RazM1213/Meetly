import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Searchbar, Card, Avatar, IconButton, Chip, FAB } from 'react-native-paper';
import { useContacts } from '../core/hooks/useContacts';
import { tempPool } from '../core/recoil/atoms/tempPool';
import { Contact } from 'expo-contacts';
import { Pool } from '../core/types';

export function ContactsScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [pool, setPool] = useRecoilState<Pool>(tempPool);
    const contacts = useContacts();

    useEffect(() => {
        setSelectedContacts(pool.selectedContacts);
    }, [])

    const isContactSelected = (contact: Contact) => selectedContacts.some((c) => c.id === contact.id);

    const handleContactSelection = (contact: Contact) => {
        if (!isContactSelected(contact)) {
            setSelectedContacts([...selectedContacts, contact]);
        }
    };

    const handleContactRemoval = (index: number) => {
        setSelectedContacts(selectedContacts.filter((_, i) => i !== index));
    };

    const saveContacts = () => {
        setPool({ ...pool, selectedContacts });
        navigation.navigate('EditPoolScreen', { selectedContacts });
    };

    const renderItem = ({ item }: { item: Contact }) => (
        <Card.Title
            title={item.name}
            subtitle={item.phoneNumbers?.[0]?.number ?? 'no number'}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            right={(props) => (
                <IconButton
                    {...props}
                    icon={isContactSelected(item) ? 'check' : 'plus'}
                    onPress={() => handleContactSelection(item)}
                />
            )}
        />
    );

    const renderSelectedContacts = () => (
        <View style={styles.chipContainer}>
            {selectedContacts.map((contact, index) => (
                <Chip
                    key={index}
                    onClose={() => handleContactRemoval(index)}
                    style={styles.chip}
                >
                    {contact.name}
                </Chip>
            ))}
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                style={styles.searchbar}
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <FlatList
                data={contacts.filter((contact) =>
                    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
                )}
                renderItem={renderItem}
                keyExtractor={(item) => item.id?.toString() ?? ''}
                ListEmptyComponent={<Text>No contacts found</Text>}
                ListHeaderComponent={<Text style={{ padding: 10 }}>Contacts:</Text>}
            />
            {selectedContacts.length > 0 && renderSelectedContacts()}
            <FAB
                style={styles.fab}
                icon="check"
                onPress={saveContacts}
                disabled={selectedContacts.length === 0}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchbar:{
        marginTop: 40
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        marginRight:30
    },
    chip: {
        margin: 4,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});


export default ContactsScreen;
