import { atom } from 'recoil'
import { User } from '../../types'

const guest: User = {
    firstName: 'Israel',
    lastName: 'Israeli',
    birthDate: Date.now(),
    phoneNumber: '',
    lastSeen: Date.now(),
    token: '',
}

export const userState = atom<User>({
    key: 'user',
    default: guest,
})
