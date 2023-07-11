import { createContext, useState } from "react"
import React from "react"

interface BoardsContextValue {
    boards: Board[]
    setBoards: (boards: Board[]) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

interface BoardsProviderProps {
    children: React.ReactNode
}

const BoardsContext = createContext<BoardsContextValue>({} as BoardsContextValue)

export default BoardsContext

export const BoardsProvider: React.FC<BoardsProviderProps> = ({ children }) => {
    const [boards, setBoards] = useState<Board[]>([])
    const [loading, setLoading] = useState(true)

    return <BoardsContext.Provider value={{ boards, setBoards, loading, setLoading }}>{children}</BoardsContext.Provider>
}
