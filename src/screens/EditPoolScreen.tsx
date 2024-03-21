import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Switch, Text, Chip, Surface, Icon } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { tempPool } from '../core/recoil/atoms/tempPool'
import { usePools } from '../core/hooks/usePools'
import { Pool } from '../core/types'
import { Contact } from 'expo-contacts'


export function EditPoolScreen({ navigation }: any) {
    const route = useRoute()
    const poolId = (route.params as { id: string | "" })?.id;
    const { poolList, addPool, removePool } = usePools()
    const [pool, setPool] = useRecoilState<Pool>(tempPool)

    useEffect(() => {
        const foundPool = poolList.find((pool) => pool.id === poolId)
        if (foundPool) {
            setPool(foundPool)
        } else {
            console.log("New pool!", poolId)
            const newPool: Pool = {
                id: poolId,
                creationDate: Math.floor(Date.now() / 1000),
                name: '',
                selectedContacts: [],
                mutualFriends: false,
                active: false,
                location: {
                    latitude: 0,
                    longitude: 0,
                    range: 0
                }
            }
            setPool(newPool)
        }
    }, [])

    useEffect(() => {
        console.log(pool)
    }, [pool])

    const addContacts = () => {
        navigation.navigate('ContactsScreen')
    }

    const deletePool = () => {
        removePool(pool);
        navigation.navigate('PoolsScreen');
    }

    const savePool = () => {
        addPool(pool)
        navigation.navigate('PoolsScreen');
    }

    const handleContactRemoval = (contact: Contact) => {
        const updatedSelectedContacts = pool.selectedContacts.filter((c) => c.id !== contact.id);
        setPool({ ...pool, selectedContacts: updatedSelectedContacts });
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge">
                Name
            </Text>
            <TextInput
                mode='outlined'
                value={pool.name}
                placeholder='e.g. Best Friends'
                onChangeText={(value) => setPool({ ...pool, name: value })}
                style={styles.input}
            />

            <View style={styles.toggleContainer}>
                <Surface style={styles.surface}>
                    <Text variant='bodyLarge' >Mutual Friends</Text>
                    <Switch
                        value={pool.mutualFriends}
                        onValueChange={() => setPool({ ...pool, mutualFriends: !pool.mutualFriends })}
                    />
                </Surface>
            </View>


            <View style={styles.headerContainer}>
                <Text variant="headlineLarge">
                    Contacts
                </Text>
                <Button mode='outlined' onPress={addContacts} style={styles.buttonAdd}>
                    Add +
                </Button>
            </View>


            <View style={styles.chipContainer}>
                {pool.selectedContacts && pool.selectedContacts.length > 0 ? (
                    pool.selectedContacts.map((contact, index) => (
                        <View key={contact.id} style={styles.chipWrapper}>
                            <Chip
                                onClose={() => handleContactRemoval(contact)}
                            >
                                {contact.name}
                            </Chip>
                            {index < pool.selectedContacts.length - 1 && <View style={styles.chipSpacer} />}
                        </View>
                    ))
                ) : (
                    <Text>No contacts selected...</Text>
                )}
            </View>



            <View style={styles.actionButtonsContainer}>
                <Button mode="outlined" onPress={deletePool} style={styles.actionButton}>
                    Delete Pool
                </Button>

                <Button mode="contained" onPress={savePool} disabled={pool.selectedContacts?.length === 0} style={styles.actionButton}>
                    Save Pool
                </Button>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flexGrow: 1,
        padding: 16,
    },
    input: {
        marginTop: 10,
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
    },
    surface: {
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center'
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    chipWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipSpacer: {
        width: 8, // Adjust the width as needed
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginBottom: 16,
    },
    buttonAdd: {
        marginLeft: 8,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 8,
    },
})



export default EditPoolScreen
