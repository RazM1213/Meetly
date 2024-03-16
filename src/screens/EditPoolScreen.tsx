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
    const { pools } = usePools()
    const [pool, setPool] = useRecoilState(tempPool)

    useEffect(() => {
        const foundPool = pools.find((pool) => pool.id === poolId)
        console.log("!!!!!!!!!!!")
        if (foundPool) {
            setPool(foundPool)
        } else {
            console.log("New pool!", poolId)
            const newPool : Pool = {
                id: poolId, creationDate: Math.floor(Date.now() / 1000),
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
    }, [pools])

    useEffect(() => {
        console.log(pool)
    }, [pool])

    const addContacts = () => {
        navigation.navigate('ContactsScreen')
    }

    const savePool = () => {
        // Implement logic to save the pool with contacts
        console.log('Saving pool with contacts:', pool.selectedContacts)
        insertPool(pool)
    }

    return (
        <View style={styles.container}>
            <TextInput
                label="Pool Name"
                value={pool.name}
                onChangeText={(value) => setPool({ ...pool, name: value })}
                style={styles.input}
            />

            <Button mode="contained" onPress={addContacts} style={styles.button}>
                Select Contacts
            </Button>

            <View style={styles.toggleContainer}>
                <Text>Mutual Friends</Text>
                <Switch
                    value={pool.mutualFriends}
                    onValueChange={() => setPool({ ...pool, mutualFriends: !pool.mutualFriends })}
                />
            </View>

            <View style={styles.chipContainer}>
                {pool.selectedContacts?.map((contact) => (
                    <Chip
                        key={contact.id}
                        onClose={() => alert(pool.selectedContacts.filter((c) => c.id !== contact.id))}
                    >
                        {contact.name}
                    </Chip>
                ))}
            </View>

            <Button mode="contained" onPress={savePool} disabled={pool.selectedContacts?.length === 0}>
                Save Pool
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
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
