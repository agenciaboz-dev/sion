import { Box, Button, TextField, MenuItem, IconButton, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import {
    ControlledBoard,
    OnDragEndNotification,
    moveCard,
    KanbanBoard,
    Card,
    changeColumn,
    moveColumn,
    Column as ColumnType,
} from "@caldwell619/react-kanban"

import { Card as CardContainer } from "../Validations/Card"
import { Contract, Status } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import "./style.scss"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { SearchField } from "../../../components/SearchField"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import SettingsIcon from "@mui/icons-material/Settings"
import DeleteIcon from "@mui/icons-material/Delete"
import { useConfirmDialog } from "burgos-confirm"
import { useSnackbar } from "burgos-snackbar"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { useColors } from "../../../hooks/useColors"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { ColumnAdder } from "./ColumnAdder"

interface BoardsProps {}
interface CardBag {
    removeCard?: () => void
    dragging: boolean
}
interface FormValues {
    search: string
}

export const Boards: React.FC<BoardsProps> = ({}) => {
    const api = useApi()
    const navigate = useNavigate()
    const initialValues = { search: "" }
    const colors = useColors()

    const { confirm } = useConfirmDialog()
    const { snackbar } = useSnackbar()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)
    const [boards, setBoards] = useState<Board[]>([])
    const [currentBoard, setCurrentBoard] = useState<Board>()
    const [board, setBoard] = useState<KanbanBoard<Card>>()
    const [isIcon, setIcon] = useState(false)
    const [isVisibleContainer, setIsVisibleContainer] = useState(true)
    const [statuses, setStatuses] = useState<Status[]>([])
    const [deleteloading, setDeleteloading] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [firstRender, setFirstRender] = useState(true)
    const [editLoading, setEditLoading] = useState(false)

    const handleToggleVisibility = () => {
        setIsVisibleContainer((prevIsVisible) => !prevIsVisible)
    }

    const handleSearchSubmit = (values: FormValues) => {
        // setLoading(true)
        // api.contracts.find.name({
        //     data: values,
        //     callback: (response: { data: Contract[] }) => setContracts(response.data),
        //     finallyCallback: () => setLoading(false),
        // })
    }

    const handleColumnMove: OnDragEndNotification<ColumnType<Card>> = (_column, from, destination) => {
        const moved = moveColumn(board, from, destination)
        setBoard(moved)
        console.log(moved)

        const columns: Column[] = JSON.parse(currentBoard!.columns)
        const newColumns = moved.columns.map((item: any, index: number) => ({
            ...columns.filter((column) => column.id == item.id)[0],
            id: index + 1,
        }))
        const newBoard = { ...currentBoard!, columns: JSON.stringify(newColumns) }

        setCurrentBoard(newBoard)
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

    const renameColumn = (id: number | string, event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        if (!editMode) return
        const columns: Column[] = JSON.parse(currentBoard!.columns)
        const column = columns.filter((item) => item.id == id)[0]

        column.name = event.target.value
        setCurrentBoard({
            ...currentBoard!,
            columns: JSON.stringify([...columns.filter((item) => item.id != column.id), column].sort((a, b) => a.id - b.id)),
        })

        setBoard({
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
        })
    }

    const renameBoard = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        setCurrentBoard({ ...currentBoard!, name: event.target.value })
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

    const deleteBoard = (board: Board) => {
        confirm({
            content: "Tem certeza que deseja deletar esse quadro?",
            title: "Atenção",
            onConfirm: () => {
                setDeleteloading(board.id)
                api.boards.delete({
                    data: board,
                    callback: () => setBoards(boards.filter((item) => item.id != board.id)),
                    finallyCallback: () => setDeleteloading(0),
                })
            },
        })
    }

    const deleteColumn = (id: number | string) => {
        confirm({
            title: "Atenção",
            content: "Tem certeza que deseja deletar essa coluna?",
            onConfirm: () => {
                const columns: Column[] = JSON.parse(currentBoard!.columns)
                const column = columns.filter((item) => item.id == id)[0]

                const newColumns = columns.filter((item) => item.id != column.id)

                setCurrentBoard({ ...currentBoard!, columns: JSON.stringify(newColumns) })
                setBoard({
                    columns: newColumns.map((column) => ({
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
                })
            },
        })
    }

    const addColumn = (column: Column) => {
        const columns: Column[] = JSON.parse(currentBoard!.columns)
        const newColumns = [...columns, { ...column, id: columns.length + 1 }].sort((a, b) => a.id - b.id)

        setCurrentBoard({ ...currentBoard!, columns: JSON.stringify(newColumns) })
        setBoard({
            columns: newColumns.map((column) => ({
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
        })
    }

    useEffect(() => {
        if (!firstRender) {
            if (!editMode) {
                setEditLoading(true)

                api.boards.update({
                    data: currentBoard,
                    callback: () => null,
                    finallyCallback: () => setEditLoading(false),
                })
            }
        } else {
            setFirstRender(false)
        }
    }, [editMode])

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
        })
    }, [])

    return board ? (
        <Box sx={{ overflow: "hidden" }}>
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
                <Box sx={{ boxShadow: "none!important", padding: "0!important", flexDirection: "column" }}>
                    <Box sx={{ alignItems: "center", gap: "1vw" }}>
                        <IconButton onClick={() => setBoard(undefined)}>
                            <ArrowBackIcon />
                        </IconButton>
                        {editMode ? (
                            <TextField
                                defaultValue={currentBoard!.name}
                                variant="standard"
                                onBlur={(event) => renameBoard(event)}
                            />
                        ) : (
                            <p>{currentBoard?.name}</p>
                        )}
                        {currentBoard!.id > 0 && (
                            <IconButton
                                color={editMode ? "primary" : "default"}
                                onClick={() => setEditMode(!editMode)}
                                disabled={editLoading}
                            >
                                {editLoading ? <CircularProgress size="1.5rem" /> : <ModeEditIcon />}
                            </IconButton>
                        )}
                    </Box>

                    <ControlledBoard
                        onCardDragEnd={handleCardMove}
                        onColumnDragEnd={handleColumnMove}
                        disableColumnDrag={!editMode}
                        disableCardDrag={editMode}
                        onCardRemove={({ board, card, column }) => {
                            console.log({ board, card, column })
                        }}
                        renderCard={(card, option) => (
                            <Box sx={{ boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.25)", width: "15vw", height: "13.3vw" }}>
                                <CardContainer
                                    contract={contracts.filter((contract) => contract.id == card.id)[0]}
                                    column="Comercial (Correção)"
                                />
                            </Box>
                        )}
                        renderColumnHeader={(column) => (
                            <Box sx={{ width: "15vw", flexDirection: "column" }}>
                                {editMode && (
                                    <Box
                                        sx={{
                                            position: "relative",
                                            textAlign: "center",
                                            backgroundColor: colors.primary,
                                            color: "white",
                                            fontSize: "0.7vw",
                                            padding: "0.5vw",
                                            borderRadius: "0.5vw",
                                            marginBottom: "0.5vw",
                                        }}
                                    >
                                        Arrastar
                                        {column.id == board.columns.length && <ColumnAdder addColumn={addColumn} />}
                                    </Box>
                                )}
                                <Box
                                    sx={{
                                        justifyContent: "space-between",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1vw",
                                    }}
                                >
                                    <Box sx={{ gap: "1vw", display: "flex", alignItems: "center" }}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                minWidth: "0",
                                                fontSize: "0.8vw",
                                                borderRadius: "100%",
                                                width: "2vw",
                                                height: "2vw",
                                            }}
                                        >
                                            {column.cards.length}
                                        </Button>
                                        {editMode ? (
                                            <TextField
                                                defaultValue={column.title}
                                                variant="standard"
                                                onBlur={(event) => renameColumn(column.id, event)}
                                            />
                                        ) : (
                                            <p className="title">{column.title}</p>
                                        )}
                                    </Box>

                                    {editMode ? (
                                        <IconButton color="error" onClick={() => deleteColumn(column.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton>{isIcon ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton>
                                    )}
                                </Box>
                            </Box>
                        )}
                        allowRemoveColumn={true}
                        allowAddColumn={editMode}
                    >
                        {board}
                    </ControlledBoard>
                </Box>
            )}
        </Box>
    ) : (
        <Box sx={{ overflow: "hidden", gap: "1vw" }}>
            <Button onClick={() => navigate("/dashboard/boards/new", { state: { boards } })} variant="contained">
                Criar quadro
            </Button>
            {!loading && (
                <>
                    <Box sx={{ padding: "0!important", boxShadow: "none!important" }}>
                        <MenuItem
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.25);",
                                width: "100%",
                                padding: "1vw",
                            }}
                            onClick={() =>
                                selectBoard({
                                    access: 1,
                                    id: -1,
                                    name: "Quadrão",
                                    columns: JSON.stringify(
                                        statuses.map((status) => ({
                                            id: status.id,
                                            name: status.name,
                                            status: status.id,
                                        }))
                                    ),
                                })
                            }
                        >
                            <p style={{ cursor: "pointer" }}>Quadrão</p>
                        </MenuItem>
                        <IconButton color="error" disabled>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    {boards.map((board) => (
                        <Box sx={{ padding: "0!important", boxShadow: "none!important" }}>
                            <MenuItem
                                key={board.id}
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.25);",
                                    width: "100%",
                                    padding: "1vw",
                                }}
                                onClick={() => selectBoard(board)}
                            >
                                <p style={{ cursor: "pointer" }}>{board.name}</p>
                            </MenuItem>
                            <IconButton color="error" onClick={() => deleteBoard(board)}>
                                {deleteloading == board.id ? (
                                    <CircularProgress size={"1.5rem"} color="error" />
                                ) : (
                                    <DeleteIcon />
                                )}
                            </IconButton>
                        </Box>
                    ))}
                </>
            )}
        </Box>
    )
}
