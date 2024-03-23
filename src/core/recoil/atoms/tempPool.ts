import { atom } from 'recoil';
import { Pool } from '../../types';

export const tempPool = atom<Pool>({
    key: 'pool',
    default: {
        id: '',
        name: '',
        creationDate: 0,
        selectedContacts: [],
        mutualFriends: false,
        active: false,
        location: {
            latitude: 0,
            longitude: 0,
            range: 0
        }
    }
});