import { Box, Button, CircularProgress, MenuItem, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import { useRoles } from "../../../hooks/useRoles"
import { useApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import AddIcon from "@mui/icons-material/Add"
import { useUser } from "../../../hooks/useUser"
import { useStatuses } from "../../../hooks/useStatuses"
import { useBoards } from "../../../hooks/useBoards"

interface NewBoardProps {}

export const NewBoard: React.FC<NewBoardProps> = ({}) => {
    const api = useApi()
    const roles = useRoles()
    const navigate = useNavigate()
    const statuses = useStatuses()
    const boards = useBoards()

    const { user } = useUser()

    const [columns, setColumns] = useState<Column[]>([{ id: 1, name: "", status: 0 }])
    const [loading, setLoading] = useState(false)
    const [addingStatus, setAddingStatus] = useState(0)
    const [newStatusName, setNewStatusName] = useState("")
    const [loadingNewStatus, setLoadingNewStatus] = useState(false)

    const initialValues: Board = {
        id: 0,
        name: "",
        access: user?.role || 0,
        columns: "",
    }

    const newColumn = () => {
        const newColumn = {
            id: columns.length + 1,
            name: "",
            status: 0,
        }

        setColumns([...columns, newColumn])
    }

    const handleSubmit = (values: Board) => {
        if (loading) return
        let incomplete = false

        const data = { ...values, columns: JSON.stringify(columns) }

        if (!data.access) incomplete = true

        columns.map((column) => {
            if (!column.status) incomplete = true
        })

        if (incomplete) return

        console.log(data)
        setLoading(true)
        api.boards.new({
            data,
            callback: (response: { data: Board }) => {
                navigate("/dashboard/boards")
                boards.add(response.data)
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const handleColumnName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, column: Column) => {
        setColumns([...columns.filter((item) => item.id != column.id), { id: column.id, name: event.target.value, status: column.status }])
    }

    const handleColumnStatus = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, column: Column) => {
        if (event.target.value == "-1") return

        setColumns([...columns.filter((item) => item.id != column.id), { id: column.id, name: column.name, status: Number(event.target.value) }])
    }

    const addStatus = () => {
        if (loadingNewStatus) return
        if (!setNewStatusName) return

        if (statuses.list.filter((status) => status.name == newStatusName).length > 0) return

        setLoadingNewStatus(true)
        api.boards.status.new({
            data: { name: newStatusName },
            callback: (response: { data: Status }) => {
                statuses.add(response.data)
                setAddingStatus(0)
                setLoadingNewStatus(false)
                setNewStatusName("")
                setColumns([
                    ...columns.filter((item) => item.id != addingStatus),
                    { ...columns.filter((item) => item.id == addingStatus)[0], status: Number(response.data.id) },
                ])
            },
        })
    }

    const handleNewStatusBlur = () => {
        setAddingStatus(0)
    }

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (addingStatus) {
                if (event.key === "Enter") {
                    event.preventDefault()
                    addStatus()
                }
            }
        }

        window.addEventListener("keydown", onKeyDown)

        return () => {
            window.removeEventListener("keydown", onKeyDown)
        }
    }, [newStatusName])
    return (
        <Box sx={{ gap: "1vw" }}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form style={{ display: "contents" }}>
                        <TextField
                            label="Nome do quadro"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                        <TextField
                            label="Nível de acesso"
                            name="access"
                            value={values.access}
                            onChange={handleChange}
                            autoComplete="off"
                            select
                            disabled={!user?.adm}
                        >
                            <MenuItem sx={{ display: "none" }} value={0}></MenuItem>
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        Colunas
                        <Box sx={{ gap: "1vw", flexWrap: "wrap" }}>
                            {columns
                                .sort((a, b) => a.id - b.id)
                                .map((column) => (
                                    <Box key={column.id} sx={{ width: "32.4%" }}>
                                        <TextField
                                            label={column.id}
                                            autoComplete="off"
                                            fullWidth
                                            inputProps={{ style: { width: 0 } }}
                                            InputProps={{
                                                startAdornment: (
                                                    <Box sx={{ gap: "1vw" }}>
                                                        <TextField
                                                            placeholder="Nome"
                                                            value={column.name}
                                                            onChange={(event) => handleColumnName(event, column)}
                                                            autoComplete="off"
                                                            variant="standard"
                                                            fullWidth
                                                            required
                                                        />
                                                        {addingStatus == column.id ? (
                                                            // ADD NEW STATUS INPUT
                                                            <TextField
                                                                placeholder="Nome do status"
                                                                value={newStatusName}
                                                                onChange={(event) => setNewStatusName(event.target.value)}
                                                                onBlur={handleNewStatusBlur}
                                                                autoComplete="off"
                                                                variant="standard"
                                                                fullWidth
                                                                required
                                                                autoFocus
                                                                disabled={loadingNewStatus}
                                                                InputProps={{
                                                                    endAdornment: loadingNewStatus ? (
                                                                        <CircularProgress size={"1.5rem"} />
                                                                    ) : (
                                                                        <></>
                                                                    ),
                                                                }}
                                                            />
                                                        ) : (
                                                            <TextField
                                                                placeholder="Status"
                                                                value={column.status}
                                                                onChange={(event) => handleColumnStatus(event, column)}
                                                                autoComplete="off"
                                                                variant="standard"
                                                                fullWidth
                                                                select
                                                            >
                                                                <MenuItem disabled value={0}>
                                                                    Status
                                                                </MenuItem>
                                                                {statuses.list.map((status) => (
                                                                    <MenuItem key={status.id} value={status.id}>
                                                                        {status.name}
                                                                    </MenuItem>
                                                                ))}
                                                                <MenuItem
                                                                    value={-1}
                                                                    sx={{ justifyContent: "center" }}
                                                                    onClick={() => setAddingStatus(column.id)}
                                                                >
                                                                    <AddIcon />
                                                                </MenuItem>
                                                            </TextField>
                                                        )}
                                                    </Box>
                                                ),
                                            }}
                                        />
                                    </Box>
                                ))}
                            <Button variant="contained" onClick={newColumn}>
                                +
                            </Button>
                        </Box>
                        <Button variant="contained" type="submit">
                            {loading ? <CircularProgress size={"1.5rem"} color="secondary" /> : "Criar"}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
