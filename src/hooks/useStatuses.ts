import { useContext } from "react"
import StatusesContext from "../contexts/statusesContext"

export const useStatuses = () => {
    const statusesContext = useContext(StatusesContext)
    const statuses = statusesContext

    const add = (status: Status) => statuses.add(status, true)
    const remove = (status: Status) => statuses.remove(status, true)
    const update = (status: Status) => statuses.update(status, true)

    return { ...statuses, add, remove, update }
}
