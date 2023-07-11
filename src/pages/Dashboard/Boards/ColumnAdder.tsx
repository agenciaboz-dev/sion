import { Box, IconButton, TextField, CircularProgress, MenuItem } from "@mui/material"
import React, { useState, useEffect } from "react"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import AddTaskIcon from "@mui/icons-material/AddTask"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Form, Formik } from "formik"
import AddIcon from "@mui/icons-material/Add"
import { useApi } from "../../../hooks/useApi"
import { useStatuses } from "../../../hooks/useStatuses"

interface ColumnAdderProps {
    addColumn: (column: Column) => void
}

export const ColumnAdder: React.FC<ColumnAdderProps> = ({ addColumn }) => {
    const api = useApi()
    const statuses = useStatuses()

    const [addingColumn, setAddingColumn] = useState(false)
    const [addingStatus, setAddingStatus] = useState(false)
    const [newStatusName, setNewStatusName] = useState("")
    const [loadingNewStatus, setLoadingNewStatus] = useState(false)

    const initialValues = {
        name: "",
        status: 0,
    }

    const handleClick = () => {
        setAddingColumn(true)
    }

    const handleSubmit = (values: { name: string; status: number }) => {
        const column: Column = {
            id: 0,
            name: values.name,
            status: values.status,
        }

        addColumn(column)
    }

    const handleNewStatusBlur = () => {
        setAddingStatus(false)
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
                setAddingStatus(false)
                setLoadingNewStatus(false)
                setNewStatusName("")
            },
        })
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

    return addingColumn ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1vw",
                position: "absolute",
                top: "-0.5vw",
                right: "-17vw",
            }}
        >
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            label="Nome"
                            placeholder="Nome da nova coluna"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            autoComplete="off"
                            variant="standard"
                        />
                        {addingStatus ? (
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
                                    endAdornment: loadingNewStatus ? <CircularProgress size={"1.5rem"} /> : <></>,
                                }}
                            />
                        ) : (
                            <TextField
                                placeholder="Status"
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                autoComplete="off"
                                variant="standard"
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
                                <MenuItem value={-1} sx={{ justifyContent: "center" }} onClick={() => setAddingStatus(true)}>
                                    <AddIcon />
                                </MenuItem>
                            </TextField>
                        )}
                        <Box sx={{ justifyContent: "space-between", display: "flex" }}>
                            <IconButton color="error" onClick={() => setAddingColumn(false)}>
                                <HighlightOffIcon />
                            </IconButton>
                            <IconButton color="success" type="submit">
                                <AddTaskIcon />
                            </IconButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    ) : (
        <IconButton sx={{ position: "absolute", top: "-0.5vw", right: "-5vw" }} color="primary" onClick={handleClick}>
            <PlaylistAddIcon sx={{ rotate: "-90deg" }} />
        </IconButton>
    )
}
