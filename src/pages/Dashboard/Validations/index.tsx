import React, {useState, useEffect} from 'react';
import './style.scss';
import { TextField } from '@mui/material';
import { Card } from './Card';
import { Contract } from '../../../definitions/contract';
import { useApi } from '../../../hooks/useApi';

interface ValidationsProps {
    
}

export const Validations:React.FC<ValidationsProps> = ({  }) => {
    
    const api = useApi()
    const [contracts, setContracts] = useState<Contract[]>([])
    const [laoding, setLoading] = useState(true)

    useEffect(() => {

        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })

    }, [])

    return (
        <div className='Validations-Component' >
            <div className="header">
                <button type='submit'> Arquivos </button>
                <button type='submit'> Ativos </button>
                <TextField  name="username"
                            label="Buscar"
                            placeholder="Buscar"
                            value=''></TextField>
            </div>
            <div className="columns">
                <div className="file">
                    <p className="title">Fichas para validação</p>
                    {contracts.filter(contract => !contract.active).map((contract) => <Card key={contract.id} contract={contract}/>)}
                </div>
                <div className="file">
                    <p className="title">Correção</p>
                    {/* <Card /> */}
                    
                </div>
                <div className="file approved">
                    <p className="title">Aprovadas</p>
                    <div className="drag">Arraste blocos aqui</div>
                    <p className="title">Arquivadas</p>
                    {/* <Card /> */}
                    {/* <Card /> */}
                </div>
                <div className="file">
                    <p className="title">Reprovadas</p>
                    {/* <Card /> */}
                </div>
            </div>
                        
        </div>
    )
}