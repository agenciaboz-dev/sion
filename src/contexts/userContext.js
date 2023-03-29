import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext({});

export default UserContext;


export const UserProvider = ({children}) => {
    const storage = useLocalStorage()
    const [value, setValue] = useState(storage.get('user_sion'))
    
    useEffect(() => {
       console.log(value)
    }, [value])
    
    return (
        <UserContext.Provider value={{value, setValue}}>
            {children}
        </UserContext.Provider>
    )
}