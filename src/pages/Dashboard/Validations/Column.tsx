import React from 'react';
import { Contract } from '../../../definitions/contract';
import { Card } from './Card';


interface ColumnProps {
    contracts: Contract[]
    title: string
}

export const Column:React.FC<ColumnProps> = ({ contracts, title }) => {
    
    return (
            <div className="file">
                    <p className="title">{title}</p>
                    {contracts.map((contract) => <Card key={contract.id} contract={contract}/>)}
                </div>
    )
}