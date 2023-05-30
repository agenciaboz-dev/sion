import React, {useState, useEffect} from 'react';
import './style.scss';
import { TextField, Button} from '@mui/material';
import { Card } from './Card';
import { Contract } from '../../../definitions/contract';
import { useApi } from '../../../hooks/useApi';
import { Column } from './Column';
import { useArray } from 'burgos-array';
import { Formik, Form } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchField } from '../../../components/SearchField';


interface ValidationsProps {
    
}
interface FormValues{ search: string }

export const Validations:React.FC<ValidationsProps> = ({  }) => {
    
    const api = useApi()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)

       const initialValues = { search: '', }

    const handleSearchSubmit = (values: FormValues) => {
        console.log(values)

        api.contracts.find.name({
            data: values,
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })
    }

    useEffect(() => {

        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })

    }, [])

    return (
        <div className="Validations-Component">
            <div className="header">
                <Button type="submit"> Arquivos </Button>
                <Button type="submit"> Ativos </Button>

                <Formik initialValues={initialValues} onSubmit={handleSearchSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <SearchField values={values} onChange={handleChange} />
                        </Form>
                    )}
                </Formik>
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