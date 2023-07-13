import { useContext } from "react"
import BoardsContext from "../contexts/boardsContext"
import { useUser } from "./useUser"

export const useBoards = () => {
    const boardsContext = useContext(BoardsContext)
    const boards = boardsContext
    const { user } = useUser()

    const add = (board: Board) => boards.add(board, user)
    const remove = (board: Board) => boards.remove(board, user)
    const update = (board: Board) => boards.update(board, user)

    return { ...boards, add, remove, update }
}
