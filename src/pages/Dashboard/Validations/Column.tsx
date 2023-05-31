import React, { useState } from "react"
import { Contract } from "../../../definitions/contract"
import { Card } from "./Card"
import { useArray } from "burgos-array"
import { Skeleton, SxProps, Button, IconButton } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

interface ColumnProps {
    contracts: Contract[]
    title: string
    approved?: boolean
    style?: React.CSSProperties
    styleButton?: React.CSSProperties
    loading: boolean
    archive?: boolean
}

const ContractList = ({ contracts }: { contracts: Contract[] }) => {
    return contracts.length > 0 ? (
        <>
            {contracts.map((contract) => (
                <Card key={contract.id} contract={contract} />
            ))}
        </>
    ) : (
        <div className="drag">Arraste blocos aqui</div>
    )
}

export const Column: React.FC<ColumnProps> = ({ contracts, title, approved, style, styleButton, loading, archive }) => {
    const { newArray } = useArray()
    const skeletons = newArray(5)
    const [isIcon, setIcon] = useState(false)
    const [isVisibleContainer, setIsVisibleContainer] = useState(true)

    const skeleton_style: SxProps = {
        width: "100%",
        height: "12vw",
        flexShrink: 0,
    }

    const handleClick = () => {
        setIcon(!isIcon)
        setIsVisibleContainer(!isVisibleContainer)
    }
    return approved ? (
        <div className="file approved" style={style}>
            <div className="header-column" style={{ gap: "0.6vw" }}>
                <p className="title">{title}</p>
                <Button
                    variant="outlined"
                    type="submit"
                    className="button-archived"
                    sx={{
                        fontSize: "0.6vw",
                        left: "0.5vw",
                        height: "1.6vw",
                        width: "7vw",
                        borderRadius: "20vw",
                        borderColor: "#384974",
                    }}
                >
                    Arquivar tudo
                </Button>
                <Button variant="outlined" className="button-quantity" sx={{ minWidth: "0" }}>
                    {contracts.length}
                </Button>
            </div>

            {contracts.length > 0 ? (
                <>
                    {contracts.map((contract) => (
                        <Card key={contract.id} contract={contract} />
                    ))}
                </>
            ) : (
                <>
                    {loading ? (
                        skeletons.map((index) => <Skeleton key={index} variant="rectangular" sx={skeleton_style} />)
                    ) : (
                        <ContractList contracts={contracts} />
                    )}
                </>
            )}
        </div>
    ) : (
        <div className="file" style={style}>
            <div className="header-column">
                <p className="title">{title}</p>
                <Button variant="contained" className="button-quantity" style={styleButton} sx={{ minWidth: "0" }}>
                    {contracts.length}
                </Button>
                    <IconButton onClick={handleClick}>{isIcon ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton>
            </div>

            <>
                {isVisibleContainer && (
                    <>
                        {contracts.length > 0 ? (
                            <>
                                {contracts.map((contract) => (
                                    <Card key={contract.id} contract={contract} />
                                ))}
                            </>
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
