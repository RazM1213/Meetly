import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import { Pool } from '../core/types';


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

export { initStorage, insertPool, getPools, getContacts, removePool };
