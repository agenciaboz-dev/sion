import { useSnackbar } from "burgos-snackbar"
import { createContext, useState } from "react"
import React from "react"
import { Socket, io as ioSocket } from "socket.io-client"

interface IoContextValue {
    io: Socket
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    const io = ioSocket("ws://localhost:4101", { autoConnect: false })
    const { snackbar } = useSnackbar()

    io.on("connect", () => {
        snackbar({ severity: "success", text: "conectado com o servidor" })
    })

    io.on("disconnect", (reason) => {
        if (reason == "io client disconnect" || reason == "io server disconnect") {
            snackbar({ severity: "info", text: "desconectado do servidor" })
        } else {
            snackbar({ severity: "error", text: "conexão com o servidor perdida, tentando reconectar automaticamente" })
        }
    })

    return <IoContext.Provider value={{ io }}>{children}</IoContext.Provider>
}
