import { useEffect, useState } from 'react';
import { getPools, insertPool, removePool } from '../../utils/storage';
import { Pool } from '../types';
import { poolListState } from '../recoil/atoms/pools';
import { useRecoilState } from 'recoil';

export function usePools() {
  const [poolList, setPoolList] = useRecoilState<Pool[]>(poolListState);

  const fetchPoolsAndUpdateState = async () => {
    try {
      const fetchedPools = await getPools();
      console.log("Pools loaded", fetchedPools);
      setPoolList(fetchedPools);
    } catch (error) {
      console.error('Error fetching pools:', error);
    }
  };

  useEffect(() => {
    fetchPoolsAndUpdateState();
  }, []);

  const handleAddPool = async (pool : Pool) => {
    await insertPool(pool);
    setPoolList(await getPools());
  };

  const handleRemovePool = async (pool: Pool) => {
    await removePool(pool);
    setPoolList(await getPools());
  };

  return {
    poolList,
    addPool: handleAddPool,
    removePool: handleRemovePool,
  };
}