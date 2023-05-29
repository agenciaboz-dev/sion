import React from 'react';
import './style.scss';
import { TextField } from '@mui/material';
import { Card } from './Card';

interface ValidationsProps {
    
}

export const Validations:React.FC<ValidationsProps> = ({  }) => {
    
    return (
        <div className='Validations-Component' >
            <div className="header">
                <button type='submit'> Arquivos </button>
                <button type='submit'> Ativos </button>
                <TextField  name="username"
                            label="Pesquisar"
                            placeholder="Pesquisar"
                            value=''></TextField>
            </div>
            <div className="columns">
                <div className="file">
                    <p className="title">Fichas para validação</p>
                    <Card />
                    <Card />
                    <Card />
                </div>
                <div className="file">
                    <p className="title">Correção</p>
                    <Card />
                    
                </div>
                <div className="file approved">
                    <p className="title">Aprovadas</p>
                    <div className="drag">Arraste blocos aqui</div>
                    <p className="title">Arquivadas</p>
                    <Card />
                    <Card />
                </div>
                <div className="file">
                    <p className="title">Reprovadas</p>
                    <Card />
                </div>
            </div>
                        
        </div>
    )
}