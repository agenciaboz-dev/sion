import React, { useState } from "react"
import "./style.scss"
import { Contract } from "../../../definitions/contract"
import { Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { useApi } from "../../../hooks/useApi"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import SettingsIcon from "@mui/icons-material/Settings"
interface CardProps {
    contract: Contract
    setContract?: (updatedContract: Contract) => void
    menu?: string
    column: string
}

export const Card: React.FC<CardProps> = ({ contract, setContract, menu, column }) => {
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
                // setContract(updatedContract)
            },
        })
    }

    const handleArchiveClick = () => {
        console.log(contract)
        api.contracts.update.archive({
            data: contract,
            callback: (response: any) => {
                const updatedContract = { ...contract, archived: true }
                // setContract(updatedContract)
            },
        })
    }

    return (
        <div className="Card-Component">
            <div className="one-column">
                <div className="info-container">
                    <div className="header-card">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                gap: "0.6vw",
                            }}
                        >
                            <SettingsIcon sx={{ color: "#384974", width: "11%" }}></SettingsIcon>
                            <Button variant="contained" className="button">
                                {column}
                            </Button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5vw" }}>
                            <p className="uc">[{contract.unit}]</p>
                            <p className="uc">[{contract.supplier}]</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.1vw" }}>
                        <p className="name">{contract.name}</p>
                        <p className="attach">500 KW</p>
                        <p className="description">Adicionar comentário</p>
                    </div>
                    <hr style={{ width: "75%" }} />
                    <p className="name" style={{ fontSize: "0.8vw" }}>
                        {contract.seller.name}
                    </p>
                    <p className="description" style={{ display: "flex", fontSize: "0.6vw", justifyContent: "flex-end" }}>
                        Prazo até: {new Date(contract.date).toLocaleDateString()}
                    </p>

                    <div className="buttons-container">
                        {/*<Button variant="contained" className="button" onClick={handleSellerClick}>
                            {contract.seller.name}
                        </Button>*/}
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
