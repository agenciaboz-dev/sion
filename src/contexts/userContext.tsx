import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"
import { useContracts } from "../hooks/useContracts"

interface UserContextValue {
    user: User | null
    setUser: (value: User | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const api = useApi()
    const contracts = useContracts()

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (user) {
            contracts.setLoading(true)
            if (user.adm) {
                api.contracts.list({
                    callback: (response: { data: Contract[] }) => contracts.set(response.data),
                    finallyCallback: () => contracts.setLoading(false),
                })
            } else {
                api.contracts.find.seller({
                    data: user,
                    callback: (response: { data: Contract[] }) => contracts.set(response.data),
                    finallyCallback: () => contracts.setLoading(false),
                })
            }
        }
    }, [user])

    return <UserContext.Provider value={{ user: user, setUser: setUser }}>{children}</UserContext.Provider>
}
