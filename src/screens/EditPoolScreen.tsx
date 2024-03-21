import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Switch, Text, Chip } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { tempPool } from '../core/recoil/atoms/tempPool'
import { usePools } from '../core/hooks/usePools'
import { insertPool } from '../utils/storage'
import { Pool } from '../core/types'


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

    return (
        <View style={styles.container}>
            <TextInput
                label="Pool Name"
                value={pool.name}
                onChangeText={(value) => setPool({ ...pool, name: value })}
                style={styles.input}
            />

            <View style={styles.toggleContainer}>
                <Text>Mutual Friends</Text>
                <Switch
                    value={pool.mutualFriends}
                    onValueChange={() => setPool({ ...pool, mutualFriends: !pool.mutualFriends })}
                />
            </View>

            <Button mode="contained" onPress={addContacts} style={styles.button}>
                Select Contacts
            </Button>


            <View style={styles.chipContainer}>
                {pool.selectedContacts?.map((contact) => (
                    <Chip
                        key={contact.id}
                    // onClose={() => setcontacts(pool.selectedContacts.filter((c) => c.id !== contact.id))}
                    >
                        {contact.name}
                    </Chip>
                ))}
            </View>

            <Button mode="contained" onPress={savePool} disabled={pool.selectedContacts?.length === 0}>
                Save Pool
            </Button>
            <Button mode="outlined" onPress={deletePool}>
                Delete Pool
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    input: {
        marginTop: 48,
        marginBottom: 16,
    },
    button: {
        marginBottom: 16,
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
        marginBottom: 16,
    },
})

export default EditPoolScreen
