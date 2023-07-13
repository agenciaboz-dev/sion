import { createContext, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface StatusesContextValue {
    list: Status[]
    set: React.Dispatch<React.SetStateAction<Status[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    add: (status: Status, user: User | null) => void
    remove: (status: Status, user: User | null) => void
    update: (status: Status, user: User | null) => void
}

interface StatusesProviderProps {
    children: React.ReactNode
}

const StatusesContext = createContext<StatusesContextValue>({} as StatusesContextValue)

export default StatusesContext

export const StatusesProvider: React.FC<StatusesProviderProps> = ({ children }) => {
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [statuses, setStatuses] = useState<Status[]>([])
    const [loading, setLoading] = useState(true)

    const list = statuses.sort((a, b) => a.id - b.id)
    const set = setStatuses
    const add = (status: Status, user: User | null = null) => {
        if (user) io.emit("status:new", { status, user_id: user.id })
        setStatuses([...statuses, status])
        snackbar({ severity: user ? "success" : "info", text: `Novo status ${status.name}` })
    }

    const remove = (status: Status, user: User | null = null) => {
        if (user) io.emit("status:remove", { status, user_id: user.id })
        setStatuses(statuses.filter((item) => item.id != status.id))
        snackbar({ severity: user ? "warning" : "info", text: `Status ${status.name} removido` })
    }

    const update = (status: Status, user: User | null = null) => {
        setStatuses([...statuses.filter((item) => item.id != status.id), status])
        if (user) io.emit("status:update", { status, user_id: user.id })
        snackbar({ severity: user ? "success" : "info", text: `Status ${status.name} atualizado` })
    }

    io.on("status:new", (status: Status) => add(status))
    io.on("status:remove", (status: Status) => remove(status))
    io.on("status:update", (status: Status) => update(status))

    return <StatusesContext.Provider value={{ list, set, add, remove, update, loading, setLoading }}>{children}</StatusesContext.Provider>
}
