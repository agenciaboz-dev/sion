import { useContext } from "react"
import ContractsContext from "../contexts/contractsContext"

export const useContracts = () => {
    const contractsContext = useContext(ContractsContext)
    const contracts = contractsContext

    const add = (contract: Contract) => contracts.add(contract, true)
    const remove = (contract: Contract) => contracts.remove(contract, true)
    const update = (contract: Contract) => contracts.update(contract, true)

    return { ...contracts, add, remove, update }
}
