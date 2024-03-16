import { atom } from 'recoil';
import { Pool } from '../../types';

export const tempPool = atom<Pool>({
    key: 'pool'
});
