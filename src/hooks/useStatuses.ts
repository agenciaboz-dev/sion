import { useContext } from "react"
import StatusesContext from "../contexts/statusesContext"
import { useUser } from "./useUser"

export const useStatuses = () => {
    const statusesContext = useContext(StatusesContext)
    const statuses = statusesContext
    const { user } = useUser()

    const add = (status: Status) => statuses.add(status, user)
    const remove = (status: Status) => statuses.remove(status, user)
    const update = (status: Status) => statuses.update(status, user)

    return { ...statuses, add, remove, update }
}
