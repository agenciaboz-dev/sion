import { Dispatch, SetStateAction, createContext, useState } from "react"
import React, { useEffect } from "react"

export interface ConfirmDialog {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    setTitle: (title: string) => void
    content: string
    setContent: (title: string) => void
    onConfirm: () => void
    setOnConfirm: Dispatch<SetStateAction<any>>
}

interface ConfirmDialogProviderProps {
    children: React.ReactNode
}

const ConfirmDialogContext = createContext<ConfirmDialog>({} as ConfirmDialog)

export default ConfirmDialogContext

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = ({ children }) => {
    const [onConfirm, setOnConfirm] = useState(() => () => alert("initial"))
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        console.log({ open })
    }, [open])

    return (
        <ConfirmDialogContext.Provider
            value={{ open, setOpen, title, setTitle, content, setContent, onConfirm, setOnConfirm }}
        >
            {children}
        </ConfirmDialogContext.Provider>
    )
}
