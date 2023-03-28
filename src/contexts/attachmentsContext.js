import { createContext, useEffect, useState } from 'react';
import { useClient } from '../hooks/useClient';

const AttachmentsContext = createContext({});

export default AttachmentsContext;


export const AttachmentsProvider = ({children}) => {
    const [value, setValue] = useState({})
    const client = useClient()

    useEffect(() => {
        client.setValue({...client.value, anexos: value})
    }, [value])

    return (
        <AttachmentsContext.Provider value={{value, setValue}}>
            {children}
        </AttachmentsContext.Provider>
    )
}