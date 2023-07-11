import { createContext, useState } from "react"
import React from "react"

interface StatusesContextValue {
    statuses: Status[]
    setStatuses: (value: Status[]) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

interface StatusesProviderProps {
    children: React.ReactNode
}

const StatusesContext = createContext<StatusesContextValue>({} as StatusesContextValue)

export default StatusesContext

export const StatusesProvider: React.FC<StatusesProviderProps> = ({ children }) => {
    const [statuses, setStatuses] = useState<Status[]>([])
    const [loading, setLoading] = useState(true)

    return <StatusesContext.Provider value={{ statuses, setStatuses, loading, setLoading }}>{children}</StatusesContext.Provider>
}
