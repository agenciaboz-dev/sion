import { createContext, useEffect, useState } from "react"
import React from "react"
import { User } from "../definitions/user"
import { useLocalStorage } from "../hooks/useLocalStorage.js"

interface UserContextValue {
    value: User | null
    setValue: (value: User | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const storage = useLocalStorage()
    const [value, setValue] = useState(storage.get("user_sion"))

    useEffect(() => {
        console.log(value)
    }, [value])

    return <UserContext.Provider value={{ value, setValue }}>{children}</UserContext.Provider>
}
