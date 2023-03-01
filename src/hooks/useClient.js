import { useContext } from 'react'
import ClientContext from '../contexts/clientContext'

export const useClient = () => {
    const clientContext = useContext(ClientContext);

    return clientContext;
}
