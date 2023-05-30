import React from "react"
import "./style.scss"
import { Contract } from "../../../definitions/contract"
import { Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { useApi } from "../../../hooks/useApi"

interface CardProps {
    contract: Contract
}

export const Card: React.FC<CardProps> = ({ contract }) => {
    const navigate = useNavigate()
    const api = useApi()

    const handleSellerClick = () => {
        navigate(`/dashboard/seller/${contract.seller.id}`)
    }

    const handleUnarchiveClick = () => {
        console.log(contract)
        api.contracts.update.unarchive({
            data: contract,
            callback: (response: any) => console.log(response.data),
        })
    }

    const handleArchiveClick = () => {
        console.log(contract)
        api.contracts.update.archive({
            data: contract,
            callback: (response: any) => console.log(response.data),
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
                        {contract.archived && (
                            <IconButton sx={{ width: "auto" }} onClick={handleUnarchiveClick}>
                                <RotateLeftIcon />
                            </IconButton>
                        )}
                        {contract.reproved && (
                            <IconButton>
                                <Inventory2OutlinedIcon color="primary" onClick={handleArchiveClick} />
                            </IconButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
