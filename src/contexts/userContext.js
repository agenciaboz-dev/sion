import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext({});

export default UserContext;


export const UserProvider = ({children}) => {
    const [value, setValue] = useState(null)
    const storage = useLocalStorage()
    
    useEffect(() => {
       console.log(value)
    }, [value])
    
    useEffect(() => {
        if (!value) setValue(storage.get('user'))
    }, [])

    return (
        <UserContext.Provider value={{value, setValue}}>
            {children}
        </UserContext.Provider>
    )
}