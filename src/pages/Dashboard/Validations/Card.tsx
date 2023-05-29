import React from 'react';
import './style.scss';
import { Contract } from '../../../definitions/contract';
import {Button} from '@mui/material'

interface CardProps {
    contract: Contract
}

export const Card:React.FC<CardProps> = ({ contract }) => {
    
    return (
        <div className='Card-Component' >
                <div className="one-column">
                    <div className="info-container">
                        <p className="name">{contract.name}/<span>{contract.unit}</span></p>
                        <p className="attach">3 anexos</p>
                        <p className="description">Adicionar descrição</p>
                        <Button variant='contained' className='button' type="submit">{contract.seller.name}</Button>
                    </div>
                </div>
        </div>
    )
}