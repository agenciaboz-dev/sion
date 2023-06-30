import { Box, Button, TextField, MenuItem, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { ControlledBoard, OnDragEndNotification, moveCard, KanbanBoard, Card } from "@caldwell619/react-kanban"
import { Card as CardContainer } from "../Validations/Card"
import { Contract, Status } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { SearchField } from "../../../components/SearchField"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

interface BoardsProps {}
interface FormValues {
    search: string
}

export const Boards: React.FC<BoardsProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()
    const initialValues = { search: "" }

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)
    const [boards, setBoards] = useState<Board[]>([])
    const [currentBoard, setCurrentBoard] = useState<Board>()
    const [board, setBoard] = useState<KanbanBoard<Card>>()
    const [statuses, setStatuses] = useState<Status[]>([])
    const [isIcon, setIcon] = useState(false)
    const [isVisibleContainer, setIsVisibleContainer] = useState(true)

    const handleSearchSubmit = (values: FormValues) => {
        setLoading(true)
        console.log(values)

        api.contracts.find.name({
            data: values,
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })
    }

    const handleClick = () => {
        setIcon(!isIcon)
        setIsVisibleContainer(!isVisibleContainer)
    }

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
    console.log(board?.columns)

    useEffect(() => {
        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })

        api.boards.get({
            callback: (response: { data: Board[] }) => setBoards(response.data),
            finallyCallback: () => setLoading(false),
        })

        api.contracts.status({
            callback: (response: { data: Status[] }) => setStatuses(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return board ? (
        <Box>
            <Formik
                initialValues={initialValues}
                sx={{ position: "absolute", top: "7vw", left: "76.3vw", boxShadow: "none" }}
                onSubmit={handleSearchSubmit}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <SearchField
                            values={values}
                            onChange={handleChange}
                            loading={loading}
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: "1.9vw",
                                    width: "19vw",
                                    borderRadius: "20vw",
                                    position: "absolute",
                                    top: "5vw",
                                    right: "1.5vw",
                                    padding: "1vw",
                                },
                                "& .MuiInputBase-input": {
                                    padding: "0 12px",
                                    fontSize: "0.8vw",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "#384974",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#384974",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "#384974",
                                        borderWidth: "0.11vw",
                                    },
                                },
                            }}
                        />
                    </Form>
                )}
            </Formik>

            {!loading && (
                <ControlledBoard
                    onCardDragEnd={handleCardMove}
                    disableColumnDrag
                    onCardRemove={({ board, card, column }) => {
                        console.log({ board, card, column })
                    }}
                    renderCard={(card, options) => (
                        <Box sx={{ boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.25)", width: "15vw", height: "13vw" }}>
                            <CardContainer contract={contracts.filter((contract) => contract.id == card.id)[0]} />
                        </Box>
                    )}
                    renderColumnHeader={(column) => (
                        <Box>
                            <p>{column.title}</p>
                        </Box>
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
        <Box sx={{ gap: "1vw" }}>
            <Button onClick={() => navigate("/dashboard/boards/new")} variant="contained">
                Criar quadro
            </Button>
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