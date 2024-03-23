import { useEffect, useState } from 'react';
import { getContacts } from '../../utils/storage';
import { Contact } from 'expo-contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const fetchedContacts = await getContacts();
      setContacts(fetchedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return contacts;
}
