import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useNavigate } from "react-router-dom"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()

    const logout = () => {
        userContext.setUser(null)
        navigate("/")
    }

    return { user: userContext.user, setUser: userContext.setUser, logout }
}
