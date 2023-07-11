import { useContext } from "react"
import IoContext from "../contexts/ioContext"

export const useIo = () => {
    const ioContext = useContext(IoContext)

    return ioContext.io
}
