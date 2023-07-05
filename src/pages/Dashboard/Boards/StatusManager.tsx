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
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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

    const [expanded, setExpanded] = useState(false)

    const handleToggle = () => {
        setExpanded(!expanded)
    }
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
                            board: boards
                                .map((board) => ({ ...board, columns: JSON.parse(board.columns) }))
                                .filter((board) => board.columns.filter((column: Column) => column.status == status.id)),
                            boards: boards
                                .map((board) => ({ ...board, columns: JSON.parse(board.columns) }))
                                .filter(
                                    (board) =>
                                        board.columns.filter((column: Column) => column.status == status.id).length > 0
                                ).length,
                        }

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
                                    <Box sx={{ alignItems: "center", padding: 0 }}>
                                        {![1, 2, 3].includes(status.id) &&
                                            (editing == status.id ? (
                                                <IconButton
                                                    color="secondary"
                                                    sx={{ width: "2vw", height: "2vw" }}
                                                    onClick={() => handleSubmit(status)}
                                                >
                                                    {editLoading == status.id ? (
                                                        <CircularProgress size="1.2rem" />
                                                    ) : (
                                                        <CheckCircleIcon />
                                                    )}
                                                </IconButton>
                                            ) : (
                                                <IconButton color="secondary" onClick={() => setEditing(status.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            ))}
                                        {![1, 2, 3].includes(status.id) && !contains.contracts && !contains.boards && (
                                            <IconButton
                                                color="secondary"
                                                sx={{
                                                    position: "relative",
                                                    width: "2vw",
                                                    height: "2vw",
                                                }}
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
                                            fontSize: "0.8vw",

                                            width: "100%",
                                            justifyContent: "space-between",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Accordion expanded={expanded} onChange={handleToggle}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <p>Quadros: {contains.boards}</p>
                                            </AccordionSummary>

                                            <AccordionDetails>{contains.board.map((board) => board.name)}</AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded} onChange={handleToggle}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <p>Contratos: {contains.contracts}</p>
                                            </AccordionSummary>

                                            <AccordionDetails>{contains.board.map((board) => board.name)}</AccordionDetails>
                                        </Accordion>
                                    </Box>
                                    {contains.contract.map((contract) => (
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
                                            <p style={{ flexWrap: "nowrap" }}>{contract.name}</p>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )
                    })
            )}
        </Box>
    )
}
