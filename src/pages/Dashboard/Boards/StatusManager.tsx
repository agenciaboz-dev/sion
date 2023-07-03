import { Box, Button, IconButton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Contract, Status } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { useConfirmDialog } from "burgos-confirm"

interface StatusManagerProps {}

export const StatusManager: React.FC<StatusManagerProps> = ({}) => {
    const api = useApi()
    const { confirm } = useConfirmDialog()

    const [loading, setLoading] = useState(true)
    const [statuses, setStatuses] = useState<Status[]>([])
    const [contracts, setContracts] = useState<Contract[]>([])
    const [boards, setBoards] = useState<Board[]>([])
    const [editing, setEditing] = useState(0)

    const handleDelete = (status: Status) => {
        confirm({
            title: "Atenção",
            content: "Deseja deletar essa situação?",
            onConfirm: () => {
                console.log(status)
            },
        })
    }

    useEffect(() => {
        api.contracts.status({
            callback: (response: { data: Status[] }) => setStatuses(response.data),
        })

        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
        })

        api.boards.get({
            callback: (response: { data: Board[] }) => setBoards(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return (
        <Box sx={{ gap: "2vw", flexWrap: "wrap", flexDirection: "row!important" }}>
            {statuses.map((status) => (
                <Box
                    key={status.id}
                    sx={{
                        width: "15vw",
                        height: "15vw",
                        flexDirection: "column",
                        padding: "1vw 1vw 1vw 2vw !important",
                        gap: "1vw",
                        position: "relative",
                    }}
                >
                    <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                        {editing == status.id ? <TextField variant="standard" value={status.name} /> : status.name}
                        {![1, 2, 3].includes(status.id) && (
                            <IconButton color="primary" onClick={() => setEditing(status.id)}>
                                <EditIcon />
                            </IconButton>
                        )}
                    </Box>

                    <Box sx={{ flexDirection: "column", gap: "0.5vw", fontSize: "0.9vw" }}>
                        <p>contratos: {contracts.filter((contract) => contract.statusId == status.id).length}</p>
                        <p>
                            quadros:{" "}
                            {
                                boards
                                    .map((board) => ({ ...board, columns: JSON.parse(board.columns) }))
                                    .filter(
                                        (board) =>
                                            board.columns.filter((column: Column) => column.status == status.id).length > 0
                                    ).length
                            }
                        </p>
                    </Box>

                    {![1, 2, 3].includes(status.id) && (
                        <IconButton
                            color="error"
                            sx={{ position: "absolute", right: "0.5vw", bottom: "0.5vw" }}
                            onClick={() => handleDelete(status)}
                        >
                            <DeleteOutlineIcon />
                        </IconButton>
                    )}
                </Box>
            ))}
        </Box>
    )
}
