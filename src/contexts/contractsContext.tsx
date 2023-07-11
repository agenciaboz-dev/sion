import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"

interface ContractsContextValue {
    contracts: Contract[]
    setContracts: (value: Contract[]) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

interface ContractsProviderProps {
    children: React.ReactNode
}

const ContractsContext = createContext<ContractsContextValue>({} as ContractsContextValue)

export default ContractsContext

export const ContractsProvider: React.FC<ContractsProviderProps> = ({ children }) => {
    const api = useApi()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log({ contracts })
    }, [contracts])

    return <ContractsContext.Provider value={{ contracts, setContracts, loading, setLoading }}>{children}</ContractsContext.Provider>
}
