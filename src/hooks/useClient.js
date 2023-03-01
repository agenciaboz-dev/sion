import { useContext, useEffect } from 'react'
import ClientContext from '../contexts/clientContext'

export const useClient = () => {
    const clientContext = useContext(ClientContext);

    useEffect(() => {
        console.log(clientContext.value)
    }, [clientContext.value])

    return clientContext;
}
