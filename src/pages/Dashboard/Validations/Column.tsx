import React from 'react';
import { Contract } from '../../../definitions/contract';
import { Card } from './Card';
import { useArray } from 'burgos-array';
import {Skeleton, SxProps} from '@mui/material'


interface ColumnProps {
    contracts: Contract[]
    title: string
}

export const Column:React.FC<ColumnProps> = ({ contracts, title }) => {

    const {newArray} = useArray()
    const skeletons = newArray(5)
    
    const skeleton_style: SxProps = {
        width: "100%",
        height: "12vw",
        flexShrink: 0,
    }

    return (
            <div className="file">
                    <p className="title">{title}</p>
                    {contracts.length > 0 ? <>{contracts.map((contract) => <Card key={contract.id} contract={contract}/>)}</> : <>
                        {skeletons.map(index => <Skeleton key={index} variant="rectangular" sx={skeleton_style}/>)}
                    </>}
                </div>
    )
}