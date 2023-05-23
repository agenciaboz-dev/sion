import TextField from '@mui/material/TextField';
import React from 'react';
import './style.scss';
import {Form, Formik} from 'formik';

interface NewSellerProps {
}


export const NewSeller:React.FC<NewSellerProps> = ({  }) => {
    


    return (
        <div className='NewSeller-Component' > 

            <div className='form'>
                <div className="infoSellers">
                    <TextField label="Nome completo" placeholder="Nome Completo" value=""/>
                    <TextField label="RG" placeholder="000.000.000-00" value=""/>
                    <TextField label="CPF" placeholder="000.000.000-00" value=""/>
                    <TextField label="Data de Nascimento" placeholder="dd/mm/aa" value=""/>
                    <TextField label="E-mail" placeholder="Objeto Social" value=""/>
                    <TextField label="Telefone" placeholder="(DDD)9 9999-9999" value=""/>
                </div>
                
                <div className="infoComplement">
                    <TextField label="Login" placeholder="Login" value=""/>
                    <TextField label="Senha" placeholder="Senha" value=""/>
                    <TextField label="Endereço Residencial" placeholder="Rua Exemplo" value=""/>
                    <TextField label="Número" placeholder="123" value=""/>
                    <TextField label="CEP (opcional)" placeholder="00000-000" value=""/>
                    <TextField label="Bairro (opcional)" placeholder="Exemplo" value=""/>
                
                </div>
            </div>
            
        </div>

        
    )
}