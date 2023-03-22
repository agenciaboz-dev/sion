import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { useUser } from "./useUser"

export const useLogout = () => {
    const [user, setUser] = useUser()
    const storage = useLocalStorage()
    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        storage.set('user_sion', null)
        navigate('/login')
    }

    return logout
}