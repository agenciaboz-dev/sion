import { useContext } from "react"
import ContractsContext from "../contexts/contractsContext"

export const useContracts = () => {
    const contractsContext = useContext(ContractsContext)

    const contracts = {
        list: contractsContext.contracts.sort((a, b) => a.id - b.id),
        contracts: contractsContext.contracts.sort((a, b) => a.id - b.id),
        set: contractsContext.setContracts,
        loading: contractsContext.loading,
        setLoading: contractsContext.setLoading,
        add: (contract: Contract) => {
            contractsContext.setContracts([...contractsContext.contracts, contract])
        },
        remove: (contract: Contract) => contractsContext.setContracts(contractsContext.contracts.filter((item) => item.id != contract.id)),
        update: (contract: Contract) =>
            contractsContext.setContracts([...contractsContext.contracts.filter((item) => item.id != contract.id), contract]),
    }

    return contracts
}
