import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"
import { useContracts } from "../hooks/useContracts"
import { useSellers } from "../hooks/useSellers"
import { useBoards } from "../hooks/useBoards"
import { useStatuses } from "../hooks/useStatuses"
import { useIo } from "../hooks/useIo"

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
    const io = useIo()
    const contracts = useContracts()
    const sellers = useSellers()
    const boards = useBoards()
    const statuses = useStatuses()

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

            sellers.setLoading(true)
            api.user.list({
                callback: (response: { data: User[] }) => sellers.set(response.data.map((user) => ({ ...user, adm: user.role == 4 }))),
                finallyCallback: () => sellers.setLoading(false),
            })

            boards.setLoading(true)
            api.boards.get({
                callback: (response: { data: Board[] }) => boards.set(response.data),
                finallyCallback: () => boards.setLoading(false),
            })

            statuses.setLoading(true)
            api.boards.status.list({
                callback: (response: { data: Status[] }) => statuses.set(response.data),
                finallyCallback: () => statuses.setLoading(false),
            })
        }
    }, [user])

    return <UserContext.Provider value={{ user: user, setUser: setUser }}>{children}</UserContext.Provider>
}
