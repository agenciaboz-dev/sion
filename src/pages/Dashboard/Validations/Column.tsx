import React from 'react';
import { Contract } from '../../../definitions/contract';
import { Card } from './Card';
import { useArray } from 'burgos-array';
import {Skeleton, SxProps} from '@mui/material'


interface ColumnProps {
    contracts: Contract[]
    title: string
    approved?: boolean
    style?: React.CSSProperties
}

<<<<<<< HEAD
export const Column:React.FC<ColumnProps> = ({ contracts, title }) => {

    const {newArray} = useArray()
    const skeletons = newArray(3)
    
=======
export const Column: React.FC<ColumnProps> = ({ contracts, title, approved, style }) => {
    const { newArray } = useArray()
    const skeletons = newArray(5)

>>>>>>> 90ff6a4805b07a05fdc741ce3e110947f80b3394
    const skeleton_style: SxProps = {
        width: "100%",
        height: "12vw",
        flexShrink: 0,
    }

    return approved ? (
        <div className="file" style={style}>
            <p className="title">{title}</p>
            <div className="drag">Arraste blocos aqui</div>
            {contracts.length > 0 ? (
                <>
                    {contracts.map((contract) => (
                        <Card key={contract.id} contract={contract} />
                    ))}
                </>
            ) : (
                <>
                    {skeletons.map((index) => (
                        <Skeleton key={index} variant="rectangular" sx={skeleton_style} />
                    ))}
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
                    {skeletons.map((index) => (
                        <Skeleton key={index} variant="rectangular" sx={skeleton_style} />
                    ))}
                </>
            )}
        </div>
    )
}