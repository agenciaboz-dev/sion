import { useEffect } from 'react';
import { createContext, useState } from 'react';

const ClientContext = createContext({});

export default ClientContext;


export const ClientProvider = ({children}) => {
    const [value, setValue] = useState(false)

    useEffect(() => {
       console.log(value)
    }, [value])

    return (
        <ClientContext.Provider value={{value, setValue}}>
            {children}
        </ClientContext.Provider>
    )
}