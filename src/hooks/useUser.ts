import { useContext } from "react"
import UserContext from "../contexts/userContext"
import { useNavigate } from "react-router-dom"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()

    const logout = () => {
        userContext.setValue(null)
        navigate("/")
    }

    return { user: userContext.value, setUser: userContext.setValue, logout }
}
