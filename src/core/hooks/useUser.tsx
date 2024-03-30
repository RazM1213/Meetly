import { userState } from '../recoil/atoms/user'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getUser, setUser as saveUser } from '../../utils/storage';
import { User } from '../types';


export function useUser() {
    const [user, setUserState] = useRecoilState<User>(userState);
  
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        // if (fetchedUser){
            console.log("User loaded", fetchedUser);
            setUserState(fetchedUser);
        // }
            
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);

    const setUser = async (user: User) => {
        await saveUser(user)
        setUserState(user);
    }
  
    return {user, setUser};
  }
  