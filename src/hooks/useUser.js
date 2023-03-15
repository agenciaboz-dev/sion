import { useContext } from 'react'
import UserContext from '../contexts/userContext'

export const useUser = () => {
   const userContext = useContext(UserContext);

   return [userContext.value, userContext.setValue]
}