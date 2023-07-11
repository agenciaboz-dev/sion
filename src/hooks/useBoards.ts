import { useContext } from "react"
import BoardsContext from "../contexts/boardsContext"

export const useBoards = () => {
    const boardsContext = useContext(BoardsContext)

    const boards = {
        list: boardsContext.boards.sort((a, b) => a.id - b.id),
        boards: boardsContext.boards.sort((a, b) => a.id - b.id),
        set: boardsContext.setBoards,
        loading: boardsContext.loading,
        setLoading: boardsContext.setLoading,
        add: (board: Board) => boardsContext.setBoards([...boardsContext.boards, board]),
        remove: (board: Board) => boardsContext.setBoards(boardsContext.boards.filter((item) => item.id != board.id)),
        update: (board: Board) => boardsContext.setBoards([...boardsContext.boards.filter((item) => item.id != board.id), board]),
    }

    return boards
}
