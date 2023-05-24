import TextField from '@mui/material/TextField';
import React from 'react';
import './style.scss';
import {Form, Formik} from 'formik';
import Button from '@mui/material/Button';

interface NewSellerProps {
}



export const NewSeller:React.FC<NewSellerProps> = ({  }) => {
    
    const initialValues = {
        name: '',
        rg: '',
        cpf: '',
        birth: '',
        email: '',
        phone: '',
        login: '',
        password: '',
        adress: '',
        number: '',
        cep: '',
        district: ''

    }

    const handleSubmit = () =>{

    }

    return (
        <div className='NewSeller-Component' > 
    
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({values, handleChange})=>(
                <Form>
                    <div className='form'>
                    
                        <div className="infoSellers">
                            <p className="data">Dados Pessoais</p>
                            <TextField label="Nome completo" placeholder="Nome Completo" value=""/>
                            <TextField label="RG" placeholder="000.000.000-00" value=""/>
                            <TextField label="CPF" placeholder="000.000.000-00" value=""/>
                            <TextField label="Data de Nascimento" placeholder="dd/mm/aa" value=""/>
                            <TextField label="E-mail" placeholder="Objeto Social" value=""/>
                            <TextField label="Telefone" placeholder="(DDD)9 9999-9999" value=""/>
                        </div>
                    
                        <div className="infoComplement">
                            <p className="title">Biometria Facial</p>
                            <p className='subtitle'>Foto do rosto do vendedor</p>
                            <div className="biometry">Upload de arquivo </div>
                            <div className="two-inputs">
                                <TextField label="Login" className='login' placeholder="Login" value=""/>
                                <TextField label="Senha"  className='login'placeholder="Senha" value=""/>
                            </div>
                            <div className="two-inputs">
                                <TextField label="Endereço Residencial" placeholder="Rua Exemplo" value=""/>
                                <TextField label="Número" placeholder="123" value=""/>
                            </div>
                            <div className="two-inputs">
                                <TextField label="CEP (opcional)" placeholder="00000-000" value=""/>
                                <TextField label="Bairro (opcional)" placeholder="Exemplo" value=""/>
                            </div>
                        </div>
                    
                    </div>
                    <div className='info-container'>
                        <div className="info">
                            <p className="title">Comprovante de Residência</p>
                            <p className='subtitle'>Foto or arquivo de um comprovante de residência do vendedor</p>
                            <div className="biometry">Upload de arquivo</div>
                    
                        </div>
                        <div className="info right">
                            <p className="title">Fotos dos Documentos</p>
                            <p className='subtitle'>Fotos frente-verso do RG, CPF</p>
                             <div className="biometry">Upload de arquivo </div>
                    
                        </div>
                    </div>
                    <div className="others">
                        <p className="title">Outros Documentos</p>
                        <p className='subtitle'>Outros documentos específicos, como carteira de trabalho, título de eleitor ou carteira de trabalho</p>
                        <div className="biometry"> Upload de arquivo </div>
                    
                    </div>
                    <Button type='submit' variant="contained"> Cadastrar Vendedor</Button>
                </Form>
                )}
            </Formik>
        </div>

        
    )
}