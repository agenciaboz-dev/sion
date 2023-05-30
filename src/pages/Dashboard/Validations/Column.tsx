import React, {useState} from 'react';
import { Contract } from '../../../definitions/contract';
import { Card } from './Card';
import { useArray } from 'burgos-array';
import {Skeleton, SxProps, Button} from '@mui/material'


interface ColumnProps {
    contracts: Contract[]
    title: string
    approved?: boolean
    style?: React.CSSProperties
    loading: boolean
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

export const Column: React.FC<ColumnProps> = ({ contracts, title, approved, style,loading }) => {
    const { newArray } = useArray()
    const skeletons = newArray(5)

    const skeleton_style: SxProps = {
        width: "100%",
        height: "12vw",
        flexShrink: 0,
    }

    return approved ? (
        <div className="file approved" style={ style }>
            <div className="header-card">
                <p className="title">{title}</p>
                <Button variant="outlined" type="submit" sx={{}}> Arquivar tudo </Button>
            </div>
            
            {contracts.length > 0 ? (
                <>
                    {contracts.map((contract) => (
                        <Card key={contract.id} contract={contract} />
                    ))}
                </>
            ) : (
                <>
                    {loading ? (skeletons.map((index) => 
                        <Skeleton key={index} variant="rectangular" sx={skeleton_style} />
                        )) : (
                        <ContractList contracts={contracts} />
                    )}
                </>
            )}
        </div>
    ) : (
        <div className="file" style={style}>
            <p className="title">{title}</p>
            {contracts.length > 0 ? (
                <>
                    {contracts.map((contract) => (
                        <Card key={contract.id} contract={contract} />
                    ))}
                </>
            ) : ( 
                <>
                    {loading ? (skeletons.map((index) => 
                        <Skeleton key={index} variant="rectangular" sx={skeleton_style} />
                    )): (
                        <ContractList contracts={contracts} />       
                    )}
                </>
            )}
        </div>
    )
}