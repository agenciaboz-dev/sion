import { createContext, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface StatusesContextValue {
    list: Status[]
    set: React.Dispatch<React.SetStateAction<Status[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    add: (status: Status, emit?: boolean) => void
    remove: (status: Status, emit?: boolean) => void
    update: (status: Status, emit?: boolean) => void
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
    const add = (status: Status, emit = false) => {
        if (emit) io.emit("status:new", status)
        setStatuses([...statuses, status])
        snackbar({ severity: emit ? "success" : "info", text: `Novo status ${status.name}` })
    }

    const remove = (status: Status, emit = false) => {
        if (emit) io.emit("status:remove", status)
        setStatuses(statuses.filter((item) => item.id != status.id))
        snackbar({ severity: emit ? "warning" : "info", text: `Status ${status.name} removido` })
    }

    const update = (status: Status, emit = false) => {
        setStatuses([...statuses.filter((item) => item.id != status.id), status])
        if (emit) io.emit("status:update", status)
        snackbar({ severity: emit ? "success" : "info", text: `Status ${status.name} atualizado` })
    }

    io.on("status:new", (status: Status) => add(status))
    io.on("status:remove", (status: Status) => remove(status))
    io.on("status:update", (status: Status) => update(status))

    return <StatusesContext.Provider value={{ list, set, add, remove, update, loading, setLoading }}>{children}</StatusesContext.Provider>
}
