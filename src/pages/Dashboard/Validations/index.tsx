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
import { DragDropContext, Droppable, Draggable, DropResult, DraggableLocation } from "react-beautiful-dnd"

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

        "4": {
            id: 4,
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

                    "4": {
                        name: "Aprovadas e arquivadas",
                        contracts: response.data.filter((contract) => contract.active && contract.archived),
                        id: 2,
                    },
                    "5": {
                        name: "Reprovadas",
                        contracts: response.data.filter((contract) => contract.reproved && contract.archived),
                        id: 3,
                    },
                })
            },
            finallyCallback: () => setLoading(false),
        })
    }, [])

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result

        // Verifique se existe um destino válido
        if (!destination) {
            return
        }

        // Obtenha os IDs das colunas de origem e destino
        const sourceColumnId = source.droppableId
        const destinationColumnId = destination.droppableId

        console.log("Coluna de Origem:", sourceColumnId)
        console.log("Coluna de Destino:", destinationColumnId)

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return
        }

        const sourceColumn = columns[source.droppableId]
        const destinationColumn = columns[destination.droppableId]

        // Check if source and destination columns exist
        if (!sourceColumn || !destinationColumn) {
            return
        }

        // Find the correct contract
        const contract = sourceColumn.contracts.find((c) => c.id === Number(draggableId))
        if (!contract) {
            return
        }

        // Moving inside the same list
        if (sourceColumn === destinationColumn) {
            const newContracts = Array.from(sourceColumn.contracts)
            newContracts.splice(source.index, 1)
            newContracts.splice(destination.index, 0, contract)

            const newColumn = {
                ...sourceColumn,
                contracts: newContracts,
            }

            setColumns({
                ...columns,
                [source.droppableId]: newColumn,
            })

            return
        }

        // Define this function to replace the contract in state after it is updated
        const replaceContractInState = (updatedContract: Contract, destinationId: string) => {
            const destinationColumn = columns[destinationId]
            const newDestinationContracts = destinationColumn.contracts.map((c) =>
                c.id === updatedContract.id ? updatedContract : c
            )
            const newDestinationColumn = {
                ...destinationColumn,
                contracts: newDestinationContracts,
            }

            setColumns((prevColumns) => ({
                ...prevColumns,
                [destinationId]: newDestinationColumn,
            }))
        }

        // Moving from one list to another
        const newSourceContracts = Array.from(sourceColumn.contracts)
        newSourceContracts.splice(source.index, 1)
        const newSourceColumn = {
            ...sourceColumn,
            contracts: newSourceContracts,
        }

        const newDestinationContracts = Array.from(destinationColumn.contracts)
        newDestinationContracts.splice(destination.index, 0, contract)
        const newDestinationColumn = {
            ...destinationColumn,
            contracts: newDestinationContracts,
        }

        // Update contract status based on destination column
        if (destination.droppableId === "0") {
            // No active the contract

            console.log("Success0")
        } else if (destination.droppableId === "1") {
            // Correction the contract
            console.log("Success1")
        } else if (destination.droppableId === "2") {
            // Approve the contract
            api.contracts.update.approve({
                data: contract,
                callback: (updatedContract: Contract) => {
                    replaceContractInState(updatedContract, destination.droppableId)
                },
            })
            console.log("Approved")
        } else if (destination.droppableId === "4") {
            // Approve the contract
            api.contracts.update.disapprove({
                data: contract,
                callback: (updatedContract: Contract) => {
                    replaceContractInState(updatedContract, destination.droppableId)
                },
            })
            console.log("Disapproved")
        }
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
                                sx={{
                                    "& .MuiInputBase-root": {
                                        height: "2vw",
                                        width: "100%",
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
                            id={3}
                            contracts={contracts.filter((contract) => contract.active && contract.archived)}
                            title="Arquivadas"
                            style={{ width: "100%" }}
                            loading={loading}
                            styleButton={{ backgroundColor: "#737373" }}
                        />
                    </div>
                    <div className="file">
                        <Column
                            id={4}
                            contracts={contracts.filter((contract) => contract.reproved && !contract.archived)}
                            style={{ width: "100%" }}
                            title="Reprovadas"
                            loading={loading}
                        />
                        <Column
                            id={5}
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
