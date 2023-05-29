import React, {useState, useEffect} from 'react';
import './style.scss';
import { TextField} from '@mui/material';
import { Card } from './Card';
import { Contract } from '../../../definitions/contract';
import { useApi } from '../../../hooks/useApi';
import { Column } from './Column';
import { useArray } from 'burgos-array';

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
        <div className="Validations-Component">
            <div className="header">
                <button type="submit"> Arquivos </button>
                <button type="submit"> Ativos </button>
                <TextField name="username" label="Buscar" placeholder="Buscar" value=""></TextField>
            </div>
            <div className="columns">
                <Column contracts={contracts.filter((contract) => !contract.active)} title="Fichas para validação" />
                <Column contracts={contracts.filter((contract) => contract.wrong)} title="Correção" />
                <div className="file approved">
                    <Column
                        approved
                        contracts={contracts.filter((contract) => contract.active)}
                        title="Aprovadas"
                        style={{ width: "100%" }}
                    />
                    <Column
                        contracts={contracts.filter((contract) => contract.archived)}
                        title="Arquivadas"
                        style={{ width: "100%" }}
                    />
                </div>
                <Column contracts={contracts.filter((contract) => contract.reproved)} title="Reprovadas" />
            </div>
        </div>
    )
}