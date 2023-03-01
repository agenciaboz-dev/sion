import { useContext } from 'react'
import ClientContext from '../contexts/ClientContext'

export const useClient = () => {
    const clientContext = useContext(ClientContext);

    return clientContext;
}