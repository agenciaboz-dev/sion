import React, { useState, useEffect } from "react"
import "./style.scss"
import { TextField, Button, makeStyles } from "@mui/material"
import { Card } from "./Card"
import { Contract } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import { Column } from "./Column"
import { useArray } from "burgos-array"
import { Formik, Form } from "formik"
import CircularProgress from "@mui/material/CircularProgress"
import { SearchField } from "../../../components/SearchField"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

interface ValidationsProps {}
interface FormValues {
    search: string
}

export const Validations: React.FC<ValidationsProps> = ({}) => {
    const api = useApi()
    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)

    const initialValues = { search: "" }

    const handleSearchSubmit = (values: FormValues) => {
        setLoading(true)
        console.log(values)

        api.contracts.find.name({
            data: values,
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })
    }

    const handleFilterFiles = () => {}

    const handleFilterActive = () => {}

    useEffect(() => {
        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    type ColumnType = {
        id: number
        name: string
        contracts: Contract[]
    }

    type ColumnsType = {
        [key: string]: ColumnType
    }

    const [columns, setColumns] = useState<ColumnsType>({
        "0": {
            id: 0,
            name: "Fichas para validação",
            contracts: contracts.filter((contract) => !contract.active),
        },
        "1": {
            id: 1,
            name: "Correção",
            contracts: contracts.filter((contract) => contract.wrong),
        },

        "2": {
            id: 2,
            name: "Aprovadas",
            contracts: contracts.filter((contract) => contract.active && !contract.archived),
        },

        "3": {
            id: 3,
            name: "Reprovadas",
            contracts: contracts.filter((contract) => contract.reproved && !contract.archived),
        },
    })
    useEffect(() => {
        api.contracts.list({
            callback: (response: { data: Contract[] }) => {
                setContracts(response.data)

                setColumns({
                    "0": {
                        name: "Fichas para validação",
                        contracts: response.data.filter((contract) => !contract.active),
                        id: 0,
                    },
                    "1": {
                        name: "Correção",
                        contracts: response.data.filter((contract) => contract.wrong),
                        id: 1,
                    },

                    "2": {
                        name: "Aprovadas",
                        contracts: response.data.filter((contract) => contract.active && !contract.archived),
                        id: 2,
                    },

                    "3": {
                        name: "Reprovadas",
                        contracts: response.data.filter((contract) => contract.reproved && !contract.archived),
                        id: 3,
                    },
                })
            },
            finallyCallback: () => setLoading(false),
        })
    }, [])
    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        const start = columns[source.droppableId]
        const finish = columns[destination.droppableId]

        if (start === finish) {
            const newContractIds = Array.from(start.contracts)
            const draggedContract = newContractIds.find((contract) => contract.id === Number(draggableId)) // Convertendo draggableId em um número

            if (!draggedContract) {
                return
            }

            newContractIds.splice(source.index, 1)
            newContractIds.splice(destination.index, 0, draggedContract)

            const newColumn = {
                ...start,
                contracts: newContractIds,
            }

            setColumns({
                ...columns,
                [newColumn.id]: newColumn,
            })

            return
        }

        // Moving from one list to another
        const startContractIds = Array.from(start.contracts)
        startContractIds.splice(source.index, 1)
        const newStart = {
            ...start,
            contracts: startContractIds,
        }

        const finishContractIds = Array.from(finish.contracts)
        const draggedContract = finishContractIds.find((contract) => contract.id === Number(draggableId)) // Convertendo draggableId em um número

        if (!draggedContract) {
            return
        }

        finishContractIds.splice(destination.index, 0, draggedContract)
        const newFinish = {
            ...finish,
            contracts: finishContractIds,
        }

        setColumns({
            ...columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
        })
    }

    return (
        <div className="Validations-Component">
            <div className="header">
                <div style={{ gap: "0.6vw" }}>
                    <Button
                        variant="outlined"
                        onClick={handleFilterFiles}
                        sx={{ height: "1.7vw", fontSize: "0.7vw", borderRadius: "20vw", borderColor: "#384974" }}
                    >
                        Arquivos
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleFilterActive}
                        sx={{ height: "1.7vw", fontSize: "0.7vw", borderRadius: "20vw", borderColor: "#384974" }}
                    >
                        Ativos
                    </Button>
                </div>

                <Formik initialValues={initialValues} onSubmit={handleSearchSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <SearchField
                                values={values}
                                onChange={handleChange}
                                loading={loading}
                                fullWidth
                                sx={{
                                    width: "50%",
                                    "& .MuiInputBase-root": {
                                        height: "2vw",
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
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="columns">
                    <Column
                        id={0}
                        contracts={contracts.filter((contract) => !contract.active)}
                        title="Fichas para validação"
                        loading={loading}
                    />
                    <Column
                        id={1}
                        contracts={contracts.filter((contract) => contract.wrong)}
                        title="Correção"
                        loading={loading}
                    />
                    <div className="file approved">
                        <Column
                            approved
                            id={2}
                            contracts={contracts.filter((contract) => contract.active && !contract.archived)}
                            title="Aprovadas"
                            style={{ width: "100%" }}
                            loading={loading}
                        />
                        <Column
                            archive
                            contracts={contracts.filter((contract) => contract.active && contract.archived)}
                            title="Arquivadas"
                            style={{ width: "100%" }}
                            loading={loading}
                            styleButton={{ backgroundColor: "#737373" }}
                        />
                    </div>
                    <div className="file">
                        <Column
                            id={3}
                            contracts={contracts.filter((contract) => contract.reproved && !contract.archived)}
                            style={{ width: "100%" }}
                            title="Reprovadas"
                            loading={loading}
                        />
                        <Column
                            archive={true}
                            contracts={contracts.filter((contract) => contract.reproved && contract.archived)}
                            title="Arquivadas"
                            style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
                            styleButton={{ backgroundColor: "#737373" }}
                            loading={loading}
                        />
                    </div>
                </div>
            </DragDropContext>
        </div>
    )
}
