import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface SellersContextValue {
    list: User[]
    set: React.Dispatch<React.SetStateAction<User[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    add: (board: User, user: User | null) => void
    remove: (board: User, user: User | null) => void
    update: (board: User, user: User | null) => void
    get: (id: number | string) => User
}

interface SellersProviderProps {
    children: React.ReactNode
}

const SellersContext = createContext<SellersContextValue>({} as SellersContextValue)

export default SellersContext

export const SellersProvider: React.FC<SellersProviderProps> = ({ children }) => {
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [sellers, setSellers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const list = sellers.sort((a, b) => a.id - b.id)
    const set = setSellers
    const add = (seller: User, user: User | null = null) => {
        if (user) io.emit("user:new", { seller, user_id: user.id })
        setSellers([...sellers, seller])
        snackbar({ severity: user ? "success" : "info", text: `novo vendedor ${seller.name}` })
    }

    const remove = (seller: User, user: User | null = null) => {
        if (user) io.emit("user:remove", { seller, user_id: user.id })
        setSellers(sellers.filter((item) => item.id != seller.id))
        snackbar({ severity: user ? "warning" : "info", text: `vendedor ${seller.name} removido` })
    }

    const update = (seller: User, user: User | null = null) => {
        if (user) io.emit("user:update", { seller, user_id: user.id })
        setSellers([...sellers.filter((item) => item.id != seller.id), seller])
        snackbar({ severity: user ? "success" : "info", text: `vendedor ${seller.name} atualizado` })
    }

    const get = (id: number | string) => sellers.filter((seller) => seller.id == Number(id))[0]

    io.on("user:new", (seller: User) => add(seller))
    io.on("user:remove", (seller: User) => remove(seller))
    io.on("user:update", (seller: User) => update(seller))

    return <SellersContext.Provider value={{ list, set, add, remove, update, loading, setLoading, get }}>{children}</SellersContext.Provider>
}
