import { createContext, useState } from 'react';

const ClientContext = createContext({});

export default ClientContext;


export const ClientProvider = ({children}) => {
    const [value, setValue] = useState(false)

    return (
        <ClientContext.Provider value={{value, setValue}}>
            {children}
        </ClientContext.Provider>
    )
}