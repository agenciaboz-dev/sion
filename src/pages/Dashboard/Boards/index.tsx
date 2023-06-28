import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ControlledBoard, OnDragEndNotification, moveCard, KanbanBoard, Card } from "@caldwell619/react-kanban"
import { Card as CardContainer } from "../Validations/Card"
import { Contract } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import "./style.scss"

interface BoardsProps {}

export const Boards: React.FC<BoardsProps> = ({}) => {
    const api = useApi()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)
    const [boards, setBoards] = useState<Board[]>([])
    const [currentBoard, setCurrentBoard] = useState<Board>()
    const [board, setBoard] = useState<KanbanBoard<Card>>()

    const handleCardMove: OnDragEndNotification<Card> = (_card, source, destination) => {
        setBoard((currentBoard) => {
            return moveCard(currentBoard, source, destination)
        })

        const contract = contracts.filter((contract) => contract.id == _card.id)[0]
        const columns: Column[] = JSON.parse(currentBoard!.columns)
        const status = columns.filter((column) => column.id == destination?.toColumnId)[0].status

        api.contracts.update.status({
            data: {
                id: contract.id,
                status: status,
            },
            callback: () => {},
        })
    }

    const selectBoard = (board: Board) => {
        setCurrentBoard(board)
        const columns: Column[] = JSON.parse(board.columns)

        const initialBoard: KanbanBoard<Card> = {
            columns: columns.map((column) => ({
                id: column.id,
                title: column.name,
                cards: contracts
                    .filter((contract) => contract.statusId == column.status)
                    .map((contract) => ({
                        id: contract.id,
                        title: contract.name,
                        description: contract.email,
                    })),
            })),
        }

        setBoard(initialBoard)
    }

    useEffect(() => {
        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })

        api.boards.get({
            callback: (response: { data: Board[] }) => setBoards(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return board ? (
        <Box>
            {!loading && (
                <ControlledBoard
                    onCardDragEnd={handleCardMove}
                    disableColumnDrag
                    onCardRemove={({ board, card, column }) => {
                        console.log({ board, card, column })
                    }}
                    renderCard={(card, options) => (
                        <CardContainer contract={contracts.filter((contract) => contract.id == card.id)[0]} />
                    )}
                    allowRemoveColumn={false}
                    onColumnRename={(info) => console.log(info)}
                    allowRenameColumn={false}
                >
                    {board}
                </ControlledBoard>
            )}
        </Box>
    ) : (
        <Box>
            {!loading && (
                <>
                    {boards.map((board) => (
                        <Box key={board.id} onClick={() => selectBoard(board)}>
                            <p>{board.name}</p>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    )
}
