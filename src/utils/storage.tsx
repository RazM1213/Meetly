import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import { Pool } from '../core/types';

const initStorage = async () => {
  try {
    if (!(await AsyncStorage.getItem('pools'))) {
      const currentDate = new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem(
        'pools',
        JSON.stringify([
          { id: 1, name: 'Good Pool 1', creationDate: currentDate },
        ]),
      );
    }

    const getContactsAndUpdateStorage = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access contacts was denied');
        return;
      }
      const { data } = await Contacts.getContactsAsync();
      await AsyncStorage.setItem('contacts', JSON.stringify(data || [])); // Update contacts in AsyncStorage
    };

    await getContactsAndUpdateStorage(); // Call the function to update contacts

  } catch (error) {
    console.error('Error initializing DB:', error);
    throw error;
  }
};

const insertPool = async (pool: Pool) => {
  try {
    const pools = JSON.parse((await AsyncStorage.getItem('pools')) || '[]');
    const existingPoolIndex = pools.findIndex((p : Pool) => p.id === pool.id);

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

export { initStorage, insertPool, getPools, getContacts };
