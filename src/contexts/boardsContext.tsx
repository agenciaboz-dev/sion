import { createContext, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface BoardsContextValue {
    list: Board[]
    set: React.Dispatch<React.SetStateAction<Board[]>>
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    add: (board: Board, emit?: boolean) => void
    remove: (board: Board, emit?: boolean) => void
    update: (board: Board, emit?: boolean) => void
}

interface BoardsProviderProps {
    children: React.ReactNode
}

const BoardsContext = createContext<BoardsContextValue>({} as BoardsContextValue)

export default BoardsContext

export const BoardsProvider: React.FC<BoardsProviderProps> = ({ children }) => {
    const io = useIo()

    const { snackbar } = useSnackbar()

    const [boards, setBoards] = useState<Board[]>([])
    const [loading, setLoading] = useState(true)

    const list = boards.sort((a, b) => a.id - b.id)
    const set = setBoards
    const add = (board: Board, emit = false) => {
        if (emit) io.emit("board:new", board)
        setBoards([...boards, board])
        snackbar({ severity: emit ? "success" : "info", text: `Novo quadro ${board.name}` })
    }

    const remove = (board: Board, emit = false) => {
        if (emit) io.emit("board:remove", board)
        setBoards(boards.filter((item) => item.id != board.id))
        snackbar({ severity: emit ? "warning" : "info", text: `Quadro ${board.name} removido` })
    }

    const update = (board: Board, emit = false) => {
        setBoards([...boards.filter((item) => item.id != board.id), board])
        if (emit) io.emit("board:update", board)
        snackbar({ severity: emit ? "success" : "info", text: `Quadro ${board.name} atualizado` })
    }

    io.on("board:new", (board: Board) => add(board))
    io.on("board:remove", (board: Board) => remove(board))
    io.on("board:update", (board: Board) => update(board))

    return <BoardsContext.Provider value={{ list, set, add, remove, update, loading, setLoading }}>{children}</BoardsContext.Provider>
}
