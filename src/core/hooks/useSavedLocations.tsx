import { useState, useEffect } from 'react';
import { getSavedLocations } from '../../utils/storage';
import { SavedLocation } from '../types';


export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchSavedLocations = async () => {
      try {
        const locations = await getSavedLocations();
        if (isSubscribed) {
          setSavedLocations(locations);
        }
      } catch (error) {
        console.error('Error fetching saved locations:', error);
      }
    };

    fetchSavedLocations();

    return () => {
      isSubscribed = false;
    };
  }, []);


  const insertSavedLocation = async (location: Location) => {
      await insertSavedLocation(location)
      setSavedLocations(await getSavedLocations());
  }

  const removeSavedLocation = async (location: Location) => {
    await removeSavedLocation(location)
    setSavedLocations(await getSavedLocations());
  }

  return {savedLocations, insertSavedLocation, removeSavedLocation};
};


