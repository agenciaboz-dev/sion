import React, { useState } from "react"
import "./style.scss"
import { Contract, Status } from "../../../definitions/contract"
import { Button, IconButton, Menu, MenuItem, Theme } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useNavigate } from "react-router-dom"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import { useApi } from "../../../hooks/useApi"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import SettingsIcon from "@mui/icons-material/Settings"
import { Card as KanbanCard, KanbanBoard } from "@caldwell619/react-kanban"

interface CardProps {
    contract: Contract
    setContract?: (updatedContract: Contract) => void
    menu?: string
    column: string
    board?: Board
    contracts: Contract[]
    setContracts: (updatedContract: Contract[]) => void
    setBoard: (board: KanbanBoard<KanbanCard>) => void
}

export const Card: React.FC<CardProps> = ({ contract, setContract, column, board, contracts, setContracts, setBoard }) => {
    const navigate = useNavigate()
    const api = useApi()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const columns: Column[] = JSON.parse(board!.columns)

    const handleSeller = () => {
        navigate(`../seller/${contract.seller_id}`)
    }

    const handleContract = () => {
        navigate(`../contract/${contract.id}`)
    }
    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        console.log(columns)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleMenuItemClick = (option: number) => {
        // Lógica para tratar a seleção do menu
        console.log(`Selecionado: ${option}`)

        const status = option
        api.contracts.update.status({
            data: {
                id: contract.id,
                status: status,
            },
            callback: (response: { data: Contract }) => {
                const newContracts = [...contracts.filter((item) => item.id != contract.id), response.data]
                setContracts(newContracts)
                setBoard({
                    columns: columns.map((column) => ({
                        id: column.id,
                        title: column.name,
                        cards: newContracts
                            .filter((contract) => contract.statusId == column.status)
                            .map((contract) => ({
                                id: contract.id,
                                title: contract.name,
                                description: contract.email,
                            })),
                    })),
                })
            },
        })
        handleCloseMenu()
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
                                gap: "01vw",
                            }}
                        >
                            <IconButton color="inherit" onClick={handleOpenMenu} sx={{ padding: "0" }}>
                                <SettingsIcon sx={{ color: "#384974", padding: "0" }} />
                            </IconButton>
                            <Menu
                                sx={{
                                    "& .MuiPaper-root": {
                                        margin: 0,
                                    },
                                    "& .MuiList-root": {
                                        padding: 0,
                                    },
                                }}
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                {columns.map((column) => (
                                    <MenuItem
                                        key={column.id}
                                        sx={{
                                            gap: "0.3vw",
                                            "&:hover": {
                                                color: "#384974",
                                            },
                                            fontSize: "0.8vw",
                                        }}
                                        onClick={() => handleMenuItemClick(column.status)}
                                    >
                                        Mover para <b>{column.name}</b>
                                    </MenuItem>
                                ))}

                                <MenuItem
                                    sx={{
                                        gap: "0.3vw",
                                        "&:hover": {
                                            color: "#384974",
                                        },
                                        fontSize: "0.8vw",
                                    }}
                                    onClick={() => handleMenuItemClick(-1)}
                                >
                                    Adicionar Comentários
                                </MenuItem>
                            </Menu>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.6vw" }}>
                            <p className="uc">[{contract.unit}]</p>
                            <p className="uc">[{contract.supplier}]</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5vw" }}>
                        <button
                            className="name"
                            style={{ backgroundColor: "white", display: "flex", padding: "0" }}
                            onClick={handleContract}
                        >
                            {contract.name}
                        </button>
                        <p className="description">Adicionar comentário</p>
                    </div>
                    <hr style={{ width: "75%" }} />
                    <button
                        className="name"
                        style={{ fontSize: "0.8vw", backgroundColor: "white", display: "flex", padding: "0" }}
                        onClick={handleSeller}
                    >
                        {contract.seller.name}
                    </button>
                    <p className="description" style={{ display: "flex", fontSize: "0.6vw", justifyContent: "flex-end" }}>
                        Prazo até: {new Date(contract.date).toLocaleDateString()}
                    </p>

                    <div className="buttons-container">
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
