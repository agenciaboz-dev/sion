import React, { useState, useEffect } from "react"
import "./style.scss"
import { TextField, Button,makeStyles } from "@mui/material"
import { Card } from "./Card"
import { Contract } from "../../../definitions/contract"
import { useApi } from "../../../hooks/useApi"
import { Column } from "./Column"
import { useArray } from "burgos-array"
import { Formik, Form } from "formik"
import CircularProgress from "@mui/material/CircularProgress"
import { SearchField } from "../../../components/SearchField"

interface ValidationsProps {}
interface FormValues {
    search: string
}

export const Validations: React.FC<ValidationsProps> = ({}) => {
    const api = useApi()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)

    const initialValues = { search: "" }
    
    const handleSearchSubmit = (values: FormValues) => {
        setLoading(true)
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
                <div  style={{gap:'0.6vw'}}>
                    <Button type="submit" variant="outlined" sx={ { height: '2vw' } }>
                        Arquivos
                    </Button>
                    <Button type="submit" variant="outlined" sx={ { height: '2vw' } } > Ativos </Button>
                </div>

                <Formik initialValues={initialValues} onSubmit={handleSearchSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <SearchField
                                values={values}
                                onChange={handleChange}
                                loading={loading}
                                fullWidth
                                sx={{
                                    width: "50%",
                                    "& .MuiInputBase-root": {
                                        height: "2vw",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "0 12px",
                                        fontSize: "0.8vw",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#384974",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#384974",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#384974",
                                            borderWidth: "0.11vw",
                                        },
                                    },
                                }}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="columns">
                <Column
                    contracts={contracts.filter((contract) => !contract.active)}
                    title="Fichas para validação"
                    loading={loading}
                />
                
                <Column contracts={contracts.filter((contract) => contract.wrong)} title="Correção" loading={loading} />
                <div className="file approved">
                    <Column
                        approved
                        contracts={contracts.filter((contract) => contract.active && !contract.archived)}
                        title="Aprovadas"
                        style={{ width: "100%" }}
                        loading={loading}
                    />
                    <Column
                        contracts={contracts.filter((contract) => contract.active && contract.archived)}
                        title="Arquivadas"
                        style={{ width: "100%" }}
                        loading={loading}
                    />
                </div>
                <div className="file">
                    <Column
                        contracts={contracts.filter((contract) => contract.reproved && !contract.archived)}
                        style={{ width: "100%" }}
                        title="Reprovadas"
                        loading={loading}
                    />
                    <Column contracts={contracts.filter((contract) => contract.reproved && contract.archived)} title="Arquivadas" style={{ width: "100%" }} styleButton={{backgroundColor: 'red'}} loading={loading} />
                </div>
            </div>
        </div>
    )
}
