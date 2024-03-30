import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import { Pool, User } from '../core/types';


const initStorage = async () => {
  try {
    const getContactsAndUpdateStorage = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access contacts was denied');
        return;
      }
      const { data } = await Contacts.getContactsAsync();
      await AsyncStorage.setItem('contacts', JSON.stringify(data || []));
    };

    await getContactsAndUpdateStorage();
  } catch (error) {
    console.error('Error initializing DB:', error);
    throw error;
  }
};

const insertPool = async (pool: Pool) => {
  try {
    const pools = JSON.parse((await AsyncStorage.getItem('pools')) || '[]');
    const existingPoolIndex = pools.findIndex((p: Pool) => p.id === pool.id);

    if (existingPoolIndex !== -1) {
      pools[existingPoolIndex] = pool;
    } else {
      pools.push(pool);
    }
    await AsyncStorage.setItem('pools', JSON.stringify(pools));

  } catch (error) {
    console.error('Error inserting pool:', error);
    throw error;
  }
};


const removePool = async (pool: Pool) => {
  try {
    let pools = JSON.parse((await AsyncStorage.getItem('pools')) || '[]');
    pools = pools.filter((p: Pool) => p.id !== pool.id);
    await AsyncStorage.setItem('pools', JSON.stringify(pools));
  } catch (error) {
    console.error('Error removing pool from storage:', error);
    throw error;
  }
};


const getPools = async (): Promise<Pool[]> => {
  try {
    const pools = await AsyncStorage.getItem('pools');
    return pools ? JSON.parse(pools) : [];
  } catch (error) {
    console.error('Error selecting pools:', error);
    throw error;
  }
};

const getContacts = async (): Promise<Contacts.Contact[]> => {
  try {
    const contacts = await AsyncStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error selecting contacts:', error);
    throw error;
  }
};



const getUser = async (): Promise<User> => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error selecting user:', error);
    throw error;
  }
};


const setUser = async (user: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user:', error);
    throw error;
  }
}


const getSavedLocations = async (): Promise<Location[]> => {
  try {
    const locations = await AsyncStorage.getItem('savedLocations');
    return locations ? JSON.parse(locations) : [];
  } catch (error) {
    console.error('Error selecting saved locations:', error);
    throw error;
  }
};

const insertSavedLocation = async (location: Location) => {
  try {
    const savedLocations = await getSavedLocations();
    savedLocations.push(location);
    await AsyncStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  } catch (error) {
    console.error('Error inserting saved location:', error);
    throw error;
  }
}


const removeSavedLocation = async (location: Location) => {
  try {
    const savedLocations = await getSavedLocations();
    savedLocations.splice(savedLocations.indexOf(location), 1);
    await AsyncStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  } catch (error) {
    console.error('Error removing saved location:', error);
    throw error;
  }
};



const flushStorage = async () => {
  AsyncStorage.getAllKeys()
    .then(keys => AsyncStorage.multiRemove(keys))
    .then(() => alert('success'));
}


export { initStorage, insertPool, getPools, getContacts, removePool, getUser, setUser, flushStorage, getSavedLocations, insertSavedLocation, removeSavedLocation };
