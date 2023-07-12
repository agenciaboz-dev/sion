import { Box, Button, CircularProgress, IconButton, TextField, Skeleton, colors, Collapse, SxProps } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
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
import { useNavigate } from "react-router-dom"
import Collapsible from "react-collapsible"
import { useContracts } from "../../../hooks/useContracts"
import { useStatuses } from "../../../hooks/useStatuses"
import { useBoards } from "../../../hooks/useBoards"

interface StatusManagerProps {}

export const StatusManager: React.FC<StatusManagerProps> = ({}) => {
    const api = useApi()
    const skeletons = useArray().newArray(10)
    const navigate = useNavigate()
    const statuses = useStatuses()
    const boards = useBoards()

    const { confirm } = useConfirmDialog()
    const contracts = useContracts()

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
                        statuses.remove(status)
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
                statuses.update(values)
                setEditing(0)
            },
            finallyCallback: () => setEditLoading(0),
        })
    }

    const TriggerComponent = ({ title, length, open }: { title: string; length: number; open?: boolean }) => {
        const expandIconStyle: SxProps = {
            transition: "0.5s",
            transform: open ? "rotate(-180deg)" : "",
        }

        return (
            <Box sx={{ alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <h3 style={{ fontSize: "0.95vw", fontWeight: "400" }}>{title}</h3>
                <Box sx={{ alignItems: "center" }}>
                    <Box
                        sx={{
                            backgroundColor: "#384974",
                            color: "white",
                            fontSize: "0.95vw",
                            borderRadius: "50%",
                            width: "1.5vw",
                            height: "1.5vw",
                            justifyContent: "center",
                        }}
                    >
                        {length}
                    </Box>
                    <IconButton sx={{ padding: 0 }}>
                        <ExpandMoreIcon sx={expandIconStyle} />
                    </IconButton>
                </Box>
            </Box>
        )
    }

    const ListComponent = ({ list }: { list: ReactNode }) => {
        return (
            <Box
                sx={{
                    paddingTop: "1vw",
                    flexDirection: "column",
                    maxHeight: "12vw",
                    overflowY: "auto !important",
                    overflowX: "auto",
                }}
            >
                {list}
            </Box>
        )
    }

    return (
        <Box
            sx={{
                gap: "2vw",
                flexDirection: "row!important",
                width: "75vw !important",
            }}
        >
            {statuses.loading ? (
                <>
                    {skeletons.map((index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            animation="wave"
                            sx={{ width: "16vw", height: "35vw" }}
                        />
                    ))}
                </>
            ) : (
                statuses.list
                    .sort((a, b) => a.id - b.id)
                    .map((status) => {
                        const contains = {
                            contracts: contracts.list.filter((contract) => contract.statusId == status.id).length,
                            contract: contracts.list.filter((contract) => contract.statusId == status.id),
                            board: boards.list
                                .map((board) => ({ ...board, columns: JSON.parse(board.columns) }))
                                .filter((board) => board.columns.filter((column: Column) => column.status == status.id).length > 0),
                            boards: boards.list
                                .map((board) => ({ ...board, columns: JSON.parse(board.columns) }))
                                .filter((board) => board.columns.filter((column: Column) => column.status == status.id).length > 0).length,
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
                                                        sx={{
                                                            "& .MuiInput-root": {
                                                                color: "white", // Estilo do texto dentro do TextField
                                                            },
                                                        }}
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
                                                    <CircularProgress size="1.5rem" color="secondary" />
                                                ) : (
                                                    <DeleteOutlineIcon />
                                                )}
                                            </IconButton>
                                        )}
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        fontSize: "0.8vw",
                                        width: "16vw",
                                        justifyContent: "space-between",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            //padding: "1vw 1vw 0.5vw 1vw",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Collapsible
                                            trigger={<TriggerComponent title={"Quadros"} length={contains.boards} />}
                                            triggerWhenOpen={
                                                <TriggerComponent title={"Quadros"} length={contains.boards} open={true} />
                                            }
                                        >
                                            <ListComponent
                                                list={contains.board.map((board) => {
                                                    const stringifiedColumnBoard = {
                                                        ...board,
                                                        columns: JSON.stringify(board.columns),
                                                    }
                                                    return (
                                                        <p
                                                            key={board.id}
                                                            onClick={() => {
                                                                navigate(`../boards`, {
                                                                    state: {
                                                                        board: stringifiedColumnBoard,
                                                                        contracts: contracts,
                                                                    },
                                                                })
                                                            }}
                                                            className="button-link"
                                                        >
                                                            {board.name}
                                                        </p>
                                                    )
                                                })}
                                            />
                                        </Collapsible>
                                    </Box>
                                    <Box
                                        sx={{
                                            //padding: "1vw 1vw 0.5vw 1vw",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Collapsible
                                            trigger={<TriggerComponent title={"Contratos"} length={contains.contracts} />}
                                            triggerWhenOpen={
                                                <TriggerComponent
                                                    title={"Contratos"}
                                                    length={contains.contracts}
                                                    open={true}
                                                />
                                            }
                                        >
                                            <ListComponent
                                                list={contains.contract.map((contract) => (
                                                    <p
                                                        key={contract.id}
                                                        onClick={() => {
                                                            navigate(`../contract/${contract.id}`)
                                                        }}
                                                        className="button-link"
                                                    >
                                                        {contract.name}
                                                    </p>
                                                ))}
                                            />
                                        </Collapsible>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    })
            )}
        </Box>
    )
}
