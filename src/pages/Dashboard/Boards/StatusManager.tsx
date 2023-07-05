import { Box, Button, CircularProgress, IconButton, TextField, Skeleton, colors } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Contract, Status } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { useConfirmDialog } from "burgos-confirm"
import { Form, Formik } from "formik"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useArray } from "burgos-array"

interface StatusManagerProps {}

export const StatusManager: React.FC<StatusManagerProps> = ({}) => {
    const api = useApi()
    const skeletons = useArray().newArray(10)

    const { confirm } = useConfirmDialog()

    const [loading, setLoading] = useState(true)
    const [statuses, setStatuses] = useState<Status[]>([])
    const [contracts, setContracts] = useState<Contract[]>([])
    const [boards, setBoards] = useState<Board[]>([])
    const [editing, setEditing] = useState(0)
    const [editLoading, setEditLoading] = useState(0)
    const [deleteLoading, setDeleteLoading] = useState(0)

    const handleDelete = (status: Status) => {
        if (!!deleteLoading) return

        confirm({
            title: "Atenção",
            content: "Deseja deletar esse status?",
            onConfirm: () => {
                setDeleteLoading(status.id)
                api.boards.status.delete({
                    data: status,
                    callback: () => {
                        setStatuses(statuses.filter((item) => item.id != status.id))
                    },
                    finallyCallback: () => setDeleteLoading(0),
                })
            },
        })
    }

    const handleBlur = () => {
        setEditing(0)
    }

    const handleSubmit = (values: Status) => {
        if (!!editLoading) return

        setEditLoading(values.id)
        api.boards.status.update({
            data: values,
            callback: () => {
                setStatuses([...statuses.filter((item) => item.id != values.id), values])
                setEditing(0)
            },
            finallyCallback: () => setEditLoading(0),
        })
    }

    useEffect(() => {
        api.contracts.status({
            callback: (response: { data: Status[] }) => setStatuses(response.data),
            finallyCallback: () => setLoading(false),
        })

        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
        })

        api.boards.get({
            callback: (response: { data: Board[] }) => setBoards(response.data),
        })
    }, [])

    return (
        <Box
            sx={{
                gap: "2vw",
                flexDirection: "row!important",
                width: "75vw !important",
            }}
        >
            {loading ? (
                <>
                    {skeletons.map((index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            animation="wave"
                            sx={{ width: "15vw", height: "15vw" }}
                        />
                    ))}
                </>
            ) : (
                statuses
                    .sort((a, b) => a.id - b.id)
                    .map((status) => {
                        const contains = {
                            contracts: contracts.filter((contract) => contract.statusId == status.id).length,
                            contract: contracts.filter((contract) => contract.statusId == status.id),
                            boards: boards
                                .map((board) => ({ ...board, columns: JSON.parse(board.columns) }))
                                .filter(
                                    (board) =>
                                        board.columns.filter((column: Column) => column.status == status.id).length > 0
                                ).length,
                        }
                        const contractsWithBoards = contracts.map((contract) => {
                            const board = boards.find((board) => {
                                const columns = JSON.parse(board.columns)
                                return columns.some((column: Column) => column.status === contract.statusId)
                            })

                            return {
                                ...contract,
                                board: board ? board.name : null,
                            }
                        })

                        return (
                            <Box
                                key={status.id}
                                sx={{
                                    height: "35vw",
                                    flexDirection: "column",
                                    //boxShadow: "none !important",
                                    padding: "0 !important",
                                }}
                            >
                                <Box
                                    sx={{
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontWeight: "600",
                                        color: "white",
                                        height: "3vw",
                                        padding: "0 1vw 0 1vw",
                                        backgroundColor: "#384974",
                                    }}
                                >
                                    {editing == status.id ? (
                                        <Formik initialValues={{ name: status.name, id: status.id }} onSubmit={handleSubmit}>
                                            {({ values, handleChange }) => (
                                                <Form>
                                                    <TextField
                                                        variant="standard"
                                                        name="name"
                                                        autoComplete="off"
                                                        value={values.name}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        autoFocus
                                                    />
                                                </Form>
                                            )}
                                        </Formik>
                                    ) : (
                                        status.name
                                    )}
                                    {![1, 2, 3].includes(status.id) &&
                                        (editing == status.id ? (
                                            <IconButton color="secondary" onClick={() => handleSubmit(status)}>
                                                {editLoading == status.id ? (
                                                    <CircularProgress size="1.5rem" />
                                                ) : (
                                                    <CheckCircleIcon />
                                                )}
                                            </IconButton>
                                        ) : (
                                            <IconButton color="secondary" onClick={() => setEditing(status.id)}>
                                                <EditIcon />
                                            </IconButton>
                                        ))}
                                </Box>

                                <Box
                                    sx={{
                                        flexDirection: "column",
                                        fontSize: "0.9vw",
                                        display: "flex",
                                        overflowY: "auto",
                                        width: "15vw",
                                        gap: "0.5vw",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            padding: "1vw 1.6vw 0 1.6vw",
                                            width: "100%",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p>Contratos: {contains.contracts}</p>
                                        <p>Quadros: {contains.boards}</p>
                                    </Box>
                                        <Box
                                            color="primary"
                                            sx={{
                                                fontWeight: "600",
                                                color: "#384974",
                                                width: "90%",
                                                //height: "6vw",
                                                alignSelf: "center",
                                                padding: "1vw",
                                                backgroundColor: "",
                                            }}
                                        >
                                    {contains.contract.map((contract) => contract.name )}
                                           

                                            {contractsWithBoards.map((contract) => (
                                                <p>Quadro: {contract.board}</p>
                                                ))}
                                                </Box>
                                   
                                </Box>

                                {![1, 2, 3].includes(status.id) && !contains.contracts && !contains.boards && (
                                    <IconButton
                                        color="error"
                                        sx={{ position: "absolute", right: "0.5vw", bottom: "0.5vw" }}
                                        onClick={() => handleDelete(status)}
                                    >
                                        {deleteLoading == status.id ? (
                                            <CircularProgress size="1.5rem" color="error" />
                                        ) : (
                                            <DeleteOutlineIcon />
                                        )}
                                    </IconButton>
                                )}
                            </Box>
                        )
                    })
            )}
        </Box>
    )
}
