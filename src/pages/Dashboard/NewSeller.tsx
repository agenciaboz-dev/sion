import TextField from '@mui/material/TextField';
import React, {useState} from 'react';
import './style.scss';
import {Form, Formik} from 'formik';
import Button from '@mui/material/Button';
import { useApi } from '../../hooks/useApi';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

interface NewSellerProps {
}

interface FormValues {
    name: string
    rg: string
    cpf: string
    birth: string
    email: string
    phone: string
    login: string
    password: string
    adress: string
    number: string
    cep: string
    district: string
}



export const NewSeller:React.FC<NewSellerProps> = ({  }) => {
    const api = useApi()
    const [infoLoading, setInfoLoading] = useState(false)

    const loading_props = {
        size: "1.5rem",
        sx: { color: "white" },
    }
    
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

    const handleInfoSubmit = (values:FormValues) =>{
        setInfoLoading(true)

    }

    return (
        <div className='NewSeller-Component' > 
    
            <Formik initialValues={initialValues} onSubmit={handleInfoSubmit} >
            {({values, handleChange}) => (
                <Form>
                    <div className='form'>
                    
                        <div className="infoSellers">
                            <p className="data">Dados Pessoais</p>
                            <TextField name='name' label="Nome completo" value={values.name} onChange={handleChange}/>
                            <TextField name='rg' label="RG"  placeholder="000.000.000-00" value={values.rg} onChange={handleChange}/>
                            <TextField name='cpf' label="CPF" placeholder="000.000.000-00" value={values.cpf} onChange={handleChange}/>
                            <TextField name='birth' label="Data de Nascimento" placeholder="dd/mm/aa" value={values.birth} onChange={handleChange}/>
                            <TextField name='email' label="E-mail" placeholder="Objeto Social" value={values.email} onChange={handleChange} />
                            <TextField name='phone' label="Telefone" placeholder="(DDD)9 9999-9999" value={values.phone} onChange={handleChange}/>
                        </div>
                    
                        <div className="infoComplement">
                            <p className="title">Biometria Facial</p>
                            <p className='subtitle'>Foto do rosto do vendedor</p>
                            <div className="biometry">Upload de arquivo </div>
                            <div className="two-inputs">
                                <TextField name= 'login' label="Login" placeholder="Login" value={values.login} onChange={handleChange}/>
                                <TextField name= 'password' label="Senha"  placeholder="Senha" value={values.password} onChange={handleChange}/>
                            </div>
                            <div className="two-inputs">
                                <TextField name= 'adress' label="Endereço Residencial" placeholder="Rua Exemplo" value={values.adress} onChange={handleChange}/>
                                <TextField name= 'number' label="Número" placeholder="123" value={values.number} onChange={handleChange}/>
                            </div>
                            <div className="two-inputs">
                                <TextField name= 'cep' label="CEP (opcional)" placeholder="00000-000" value={values.cep} onChange={handleChange}/>
                                <TextField name= 'district' label="Bairro (opcional)" placeholder="Exemplo" value={values.district} onChange={handleChange}/>
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
                    <Button type='submit' variant="contained"> {infoLoading ? <CircularProgress {...loading_props}/> : "Cadastrar Vendedor" }</Button>
                </Form>
                )}
            </Formik>
        </div>

        
    )
}