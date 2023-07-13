import { useContext } from "react"
import ContractsContext from "../contexts/contractsContext"
import { useUser } from "./useUser"

export const useContracts = () => {
    const contractsContext = useContext(ContractsContext)
    const contracts = contractsContext
    const { user } = useUser()

    const add = (contract: Contract) => contracts.add(contract, user)
    const remove = (contract: Contract) => contracts.remove(contract, user)
    const update = (contract: Contract) => contracts.update(contract, user)

    return { ...contracts, add, remove, update }
}
