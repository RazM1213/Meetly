import { useEffect, useState } from 'react';
import { getPools } from '../../utils/storage';
import { Pool } from '../types';

export function usePools() {
  const [pools, setPools] = useState<Pool[]>([]);

  const fetchPools = async () => {
    try {
      const fetchedPools = await getPools();
      console.log("Pools loaded", fetchedPools);
      setPools(fetchedPools);
    } catch (error) {
      console.error('Error fetching pools:', error);
    }
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return { pools };
}
