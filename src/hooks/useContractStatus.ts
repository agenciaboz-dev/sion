import { api } from "../api"

export const useContractStatus = async () => {

    const status = (await api.get("/contracts/status")).data
    return status
}
