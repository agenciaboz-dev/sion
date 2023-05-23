import TextField from '@mui/material/TextField';
import React from 'react';
import './style.scss';
import {Form, Formik} from 'formik';

interface NewSellerProps {
    
}

export const NewSeller:React.FC<NewSellerProps> = ({  }) => {
    
    return (
        <div className='NewSeller-Component' >
            <span>Nome Completo</span>
            <TextField label="" placeholder="Nome Completo" value=""/>
            <span>RG</span>
            <TextField label="" placeholder="000.000.000-00" value=""/>
            <span>CPF</span>
            <TextField label="" placeholder="000.000.000-00" value=""/>
            <span>Data de Nascimento</span>
            <TextField label="" placeholder="dd/mm/aa" value=""/>
            <span>E-mail</span>
            <TextField label="" placeholder="Objeto Social" value=""/>
            <span>Telefone</span>
            <TextField label="" placeholder="(DDD)9 9999-9999" value=""/>
            
        </div>
    )
}