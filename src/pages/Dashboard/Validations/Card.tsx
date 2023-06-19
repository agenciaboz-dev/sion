import React from "react"
import "./style.scss"
import { Contract } from "../../../definitions/contract"
import { Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { useApi } from "../../../hooks/useApi"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

interface CardProps {
    contract: Contract
    setContract: (updatedContract: Contract) => void
}

export const Card: React.FC<CardProps> = ({ contract, setContract }) => {
    const navigate = useNavigate()
    const api = useApi()

    const handleSellerClick = () => {
        navigate(`/dashboard/seller/${contract.seller.id}`)
    }

    const handleUnarchiveClick = () => {
        console.log(contract)
        api.contracts.update.unarchive({
            data: contract,
            callback: (response: any) => {
                const updatedContract = { ...contract, archived: false }
                setContract(updatedContract)
            },
        })
    }

    const handleArchiveClick = () => {
        console.log(contract)
        api.contracts.update.archive({
            data: contract,
            callback: (response: any) => {
                const updatedContract = { ...contract, archived: true }
                setContract(updatedContract)
            },
        })
    }

    return (
        <div className="Card-Component">
            <div className="one-column">
                <div className="info-container">
                    <div className="header-card">
                        <p className="uc">{contract.unit}</p>
                        <p className="name"> {contract.name} </p>
                    </div>
                    <p className="attach">3 anexos</p>
                    <p className="description">Adicionar descrição</p>
                    <div className="buttons-container">
                        <Button variant="contained" className="button" onClick={handleSellerClick}>
                            {contract.seller.name}
                        </Button>
                        {(contract.active || contract.reproved) && (
                            <>
                                {contract.archived ? (
                                    <IconButton sx={{ width: "auto" }} onClick={handleUnarchiveClick}>
                                        <RotateLeftIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={handleArchiveClick}>
                                        <Inventory2OutlinedIcon color="primary" />
                                    </IconButton>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}