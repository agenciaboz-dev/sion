import { useContext } from "react"
import StatusesContext from "../contexts/statusesContext"

export const useStatuses = () => {
    const statusesContext = useContext(StatusesContext)
    const statuses = {
        list: statusesContext.statuses,
        statuses: statusesContext.statuses,
        set: statusesContext.setStatuses,
        loading: statusesContext.loading,
        setLoading: statusesContext.setLoading,
        add: (status: Status) => statusesContext.setStatuses([...statusesContext.statuses, status]),
        remove: (status: Status) => statusesContext.setStatuses(statusesContext.statuses.filter((item) => item.id != status.id)),
        update: (status: Status) => statusesContext.setStatuses([...statusesContext.statuses.filter((item) => item.id != status.id), status]),
    }

    return statuses
}
