import { useContext } from "react"
import BoardsContext from "../contexts/boardsContext"

export const useBoards = () => {
    const boardsContext = useContext(BoardsContext)
    const boards = boardsContext

    const add = (board: Board) => boards.add(board, true)
    const remove = (board: Board) => boards.remove(board, true)
    const update = (board: Board) => boards.update(board, true)

    return { ...boards, add, remove, update }
}
