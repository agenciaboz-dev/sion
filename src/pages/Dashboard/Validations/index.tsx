import React from 'react';
import './style.scss';
import { TextField } from '@mui/material';
import { Card } from './Card';

interface ValidationsProps {
    
}

export const Validations:React.FC<ValidationsProps> = ({  }) => {
    
    return (
        <div className='Validations-Component' >
            <p className="title">Fichas para validação</p>
           
                <Card />
                <Card />
                <Card />
            
            
        </div>
    )
}