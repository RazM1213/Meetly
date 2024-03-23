import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Searchbar, Card, Avatar, IconButton, Chip, FAB } from 'react-native-paper';
import { useContacts } from '../core/hooks/useContacts';
import { tempPool } from '../core/recoil/atoms/tempPool';
import { Contact } from 'expo-contacts';
import { Pool } from '../core/types';


interface ContactItemProps {
    item: Contact;
    onSelect: (contact: Contact) => void;
    isSelected: boolean; // Add this flag to indicate selection
}

const ContactItem: React.FC<ContactItemProps> = React.memo(({ item, onSelect, isSelected }) => (
    <Card.Title
        title={item.name}
        subtitle={item.phoneNumbers?.[0]?.number ?? 'No number'}
        left={(props) => <Avatar.Icon {...props}  icon="folder" />}
        right={(props) => (
            <IconButton
                {...props}
                icon={isSelected ? 'check' : 'plus'}
                onPress={() => { onSelect(item) }}
            />
        )}
    />
));


export function ContactsScreen({ navigation }: any) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
    const [pool, setPool] = useRecoilState<Pool>(tempPool);
    const contacts = useContacts();

    useEffect(() => {
        setSelectedContacts(pool.selectedContacts);
    }, [])

    const isContactSelected = useCallback((contact: Contact) => {
        return selectedContacts.some((c) => c.id === contact.id);
    }, [selectedContacts]);

    const handleContactSelection = useCallback((contact: Contact) => {
        if (!isContactSelected(contact)) {
            setSelectedContacts([...selectedContacts, contact]);
        } else {
            handleContactRemoval(contact)
        }
    }, [selectedContacts]);


    const handleContactRemoval = (contact: Contact) => {
        setSelectedContacts(selectedContacts.filter((c) => c.id !== contact.id));
    };

    const saveContacts = () => {
        setPool({ ...pool, selectedContacts });
        navigation.navigate('EditPoolScreen', { selectedContacts });
    };

    const renderItem = useCallback(({ item }: { item: Contact }) => (
        <ContactItem
            item={item}
            onSelect={handleContactSelection}
            isSelected={isContactSelected(item)} 
        />
    ), [handleContactSelection]);


    const renderSelectedContacts = () => (
        <View style={styles.chipContainer}>
            {selectedContacts.map((contact, index) => (
                <Chip
                    key={index}
                    onClose={() => handleContactRemoval(contact)}
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
    searchbar: {
        marginTop: 30
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 10,
        marginRight: 30
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
