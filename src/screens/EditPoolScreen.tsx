import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Switch, Text, Chip, Surface } from 'react-native-paper'
import { useRoute } from '@react-navigation/native'
import { tempPool } from '../core/recoil/atoms/tempPool'
import { usePools } from '../core/hooks/usePools'
import { Pool } from '../core/types'
import { Contact } from 'expo-contacts'
import MapView, { Marker } from 'react-native-maps'


export function ChooseLocationComponent({ navigation }: any) {
    const [location, setLocation] = useState({ latitude: 32.0840, longitude: 34.8878 });

    // const handleLocationChange = (lat: number, lng: number) => {
    //     setLocation({ latitude: lat, longitude: lng });
    // };

    return (

        <MapView
            style={{ height: 87, width: 210 }}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={(e) =>
                // handleLocationChange(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                navigation.navigate('')
            }
        >
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>

    );
};

// export default ChooseLocationComponent;


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
                <Surface style={{
                    flex: 1, marginLeft: 20, flexGrow: 1, borderWidth: 1,
                    alignItems: 'center',
                    borderRadius: 8
                }} >
                    {/* <ChooseLocationComponent /> */}
                    <Text variant='bodyLarge'>Choose Location</Text>
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
                        <View key={contact.id} >
                            <Chip mode='flat'
                                style={styles.chip}
                                onClose={() => handleContactRemoval(contact)}
                            >
                                {contact.name}
                            </Chip>
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
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 8,
    },
    chip: {
        margin: 3
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
