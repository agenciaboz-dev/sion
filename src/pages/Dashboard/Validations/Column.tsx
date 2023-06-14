import React, { useEffect, useState } from "react"
import { Contract } from "../../../definitions/contract"
import { Card } from "./Card"
import { useArray } from "burgos-array"
import { Skeleton, SxProps, Button, IconButton } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { useApi } from "../../../hooks/useApi"

interface ColumnProps {
    id?: number
    name?: string
    contracts: Contract[]
    title: string
    approved?: boolean
    style?: React.CSSProperties
    styleButton?: React.CSSProperties
    loading: boolean
    archive?: boolean
}

export const Column: React.FC<ColumnProps> = ({
    id,
    contracts,
    title,
    approved,
    style,
    styleButton,
    loading,
    archive,
    name,
}) => {
    const { newArray } = useArray()
    const skeletons = newArray(5)
    const [isIcon, setIcon] = useState(false)
    const [isVisibleContainer, setIsVisibleContainer] = useState(true)
    const [contract, setContract] = useState<Contract | null>(null)
    const [isContracts, setContracts] = useState<Contract[]>([])
    const api = useApi()

    const ContractList = ({ contracts }: { contracts: Contract[] }) => {
        return contracts.length > 0 ? (
            <>
                {contracts.map((contract) => (
                    <Card key={contract.id} contract={contract} setContract={setContract} />
                ))}
            </>
        ) : (
            <div className="drag">Arraste blocos aqui</div>
        )
    }
    const skeleton_style: SxProps = {
        width: "100%",
        height: "12vw",
        flexShrink: 0,
    }

    const handleClick = () => {
        setIcon(!isIcon)
        setIsVisibleContainer(!isVisibleContainer)
    }

    const handleAllArchive = () => {
        const updatedContracts = contracts.map((contract) => {
            if (contract.active && !contract.archived) {
                const updatedContract: Contract = { ...contract, archived: true }
                api.contracts.update.archive({
                    data: updatedContract,
                    callback: (response: any) => {
                        // Perform any necessary actions after successful update
                    },
                })
                return updatedContract
            }
            return contract
        })

        setContracts(updatedContracts)
    }

    const initialItems = () => {}

    useEffect(() => {
        console.log({ id })
    }, [])

    return approved ? (
        <div className="file approved" style={style}>
            <div className="header-column" style={{ gap: "0.6vw" }}>
                <p className="title">{title}</p>
                <div className="buttons-container">
                    <Button
                        variant="outlined"
                        type="submit"
                        className="button-archived"
                        onClick={handleAllArchive}
                        sx={{
                            fontSize: "0.45vw",
                            left: "0.5vw",
                            height: "1.6vw",
                            borderRadius: "20vw",
                            borderColor: "#384974",
                        }}
                    >
                        Arquivar tudo
                    </Button>
                    <Button
                        variant="outlined"
                        className="button-quantity"
                        sx={{ minWidth: "0", fontSize: "0.8vw", borderColor: "#384974" }}
                    >
                        {contracts.length}
                    </Button>
                    <IconButton className="iconButtonArchive" sx={{ width: "auto" }} onClick={handleClick}>
                        {isIcon ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </div>
            </div>
            {isVisibleContainer && (
                <>
                    {contracts.length > 0 ? (
                        <Droppable droppableId={String(id)}>
                            {(provided, snapshot) => (
                                <>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            height: "14vw",
                                            width: "100%",
                                            gap: "1vw",
                                            backgroundColor: snapshot.isDraggingOver ? "#384974" : "",
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {provided.placeholder}
                                        {contracts.map((contract, index) => (
                                            <Draggable key={contract.id} draggableId={String(contract.id)} index={index}>
                                                {(provided) => (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                        }}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <Card
                                                            key={contract.id}
                                                            contract={contract}
                                                            setContract={setContract}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                </>
                            )}
                        </Droppable>
                    ) : (
                        <>
                            {loading ? (
                                skeletons.map((index) => <Skeleton key={index} variant="rectangular" sx={skeleton_style} />)
                            ) : (
                                <ContractList contracts={contracts} />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    ) : (
        <div className="file" style={style}>
            <div className="header-column">
                <p className="title">{title}</p>

                <div className="buttons-container">
                    <Button
                        variant="contained"
                        className="button-quantity"
                        style={styleButton}
                        sx={{ minWidth: "0", fontSize: "0.8vw" }}
                    >
                        {contracts.length}
                    </Button>
                    <IconButton className="iconButton" sx={{ width: "auto" }} onClick={handleClick}>
                        {isIcon ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </div>
            </div>

            <>
                {isVisibleContainer && (
                    <>
                        {contracts.length > 0 ? (
                            <Droppable droppableId={String(id)}>
                                {(provided, snapshot) => (
                                    <>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "14vw",
                                                width: "100%",
                                                gap: "1vw",
                                                backgroundColor: snapshot.isDraggingOver ? "#384974" : "",
                                                alignSelf: "flex-end",
                                            }}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {provided.placeholder}
                                            {contracts.map((contract, index) => (
                                                <Draggable key={contract.id} draggableId={String(contract.id)} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "14vw",
                                                            }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <Card
                                                                key={contract.id}
                                                                contract={contract}
                                                                setContract={setContract}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </Droppable>
                        ) : (
                            <>
                                {loading ? (
                                    skeletons.map((index) => (
                                        <Skeleton key={index} variant="rectangular" sx={skeleton_style} />
                                    ))
                                ) : (
                                    <ContractList contracts={contracts} />
                                )}
                            </>
                        )}
                    </>
                )}
            </>
        </div>
    )
}
