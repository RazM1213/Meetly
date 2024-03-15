import { atom } from 'recoil'
import { User } from '../../types'

const guest: User = {
    FirstName: 'Israel',
    LastName: 'Israeli',
    Age: 76,
}

export const userState = atom<User>({
    key: 'user',
    default: guest,
})
