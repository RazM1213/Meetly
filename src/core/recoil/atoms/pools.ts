import { atom } from 'recoil';
import { Pool } from '../../types';

export const poolListState = atom<Pool[]>({
    key: 'poolList',
    default: []
});