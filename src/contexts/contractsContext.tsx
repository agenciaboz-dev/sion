import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface ContractsContextValue {
    list: Contract[]
    set: React.Dispatch<React.SetStateAction<Contract[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    add: (contract: Contract, user: User | null) => void
    remove: (contract: Contract, user: User | null) => void
    update: (contract: Contract, user: User | null) => void
}

interface ContractsProviderProps {
    children: React.ReactNode
}

const ContractsContext = createContext<ContractsContextValue>({} as ContractsContextValue)

export default ContractsContext

export const ContractsProvider: React.FC<ContractsProviderProps> = ({ children }) => {
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)

    const list = contracts.sort((a, b) => a.id - b.id)
    const set = setContracts
    const add = (contract: Contract, user: User | null = null) => {
        console.log({ contract })
        if (!contract) return
        if (user) io.emit("contract:new", { contract, user_id: user.id })
        setContracts([...contracts, contract])
        snackbar({ severity: user ? "success" : "info", text: `Novo contrato ${contract.name}` })
    }

    const remove = (contract: Contract, user: User | null = null) => {
        if (user) io.emit("contract:remove", { contract, user_id: user.id })
        setContracts(contracts.filter((item) => item.id != contract.id))
        snackbar({ severity: user ? "warning" : "info", text: `Contrato ${contract.name} removido` })
    }

    const update = (contract: Contract, user: User | null = null) => {
        console.log({ contract })
        if (!contract) return
        setContracts([...contracts.filter((item) => item.id != contract.id), contract])
        if (user) io.emit("contract:update", { contract, user_id: user.id })
        snackbar({ severity: user ? "success" : "info", text: `Contrato ${contract.name} atualizado` })
    }

    io.on("contract:new", (contract: Contract) => add(contract))
    io.on("contract:remove", (contract: Contract) => remove(contract))
    io.on("contract:update", (contract: Contract) => update(contract))

    return <ContractsContext.Provider value={{ list, set, add, remove, update, loading, setLoading }}>{children}</ContractsContext.Provider>
}
