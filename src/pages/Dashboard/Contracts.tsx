import React, { useEffect, useState } from "react"
import "./style.scss"
import { useApi } from "../../hooks/useApi"
import { Contract } from "../../definitions/contract"
import { Button, Skeleton, SxProps, TextField } from "@mui/material"
import { useArray } from "burgos-array"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Form, Formik } from "formik"
import { SearchField } from "../../components/SearchField"

interface FormValues{
    search: string
}

interface ContractsProps {}

const ContractList = ({ contracts }: { contracts: Contract[] }) => {
    return contracts.length > 0 ? (
        <>
            {contracts.map((contract) => (
                <ContractContainer key={contract.id} contract={contract} />
            ))}
        </>
    ) : (
        <div className="empty" style={{ padding: "2vw" }}>
            <p>Nenhum resultado</p>
        </div>
    )
}

export const ContractContainer = ({ contract, adm }: { contract: Contract; adm?: boolean }) => {
    const navigate = useNavigate()

    return (
        <div className="contract-container">
            <p className="title">
                {contract.name} / {contract.unit}
            </p>

            <div className="info">
                <div className="data">
                    {!adm && <p>Vendedor responsável: </p>}
                    <p>Vigente até: </p>
                </div>

                <div className="value">
                    {!adm && <p>{contract.seller.name}</p>}
                    <p>{new Date(contract.date).toLocaleDateString()}</p>
                </div>

                <Button onClick={() => navigate(`/dashboard/contract/${contract.id}`)} variant="contained">
                    Ver contrato
                </Button>
            </div>
        </div>
    )
}

export const Contracts: React.FC<ContractsProps> = ({}) => {
    const { newArray } = useArray()
    const skeletons = newArray(6)
    const api = useApi()
    const { user } = useUser()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)
    const [contract, setContract] = useState<Contract>()

    const initialValues = {
        search: "",
    }

    const handleSubmit = (values: FormValues) => {
        if (loading) return

        setLoading(true)
        api.contracts.find.name({
            data: values,
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })
    }

    const skeleton_style: SxProps = {
        width: "100%",
        height: "5vw",
        flexShrink: 0,
    }

    useEffect(() => {
        if (user!.adm) {
            api.contracts.list({
                callback: (response: { data: Contract[] }) => setContracts(response.data),
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.contracts.find.seller({
                data: user!,
                callback: (response: { data: Contract[] }) => setContracts(response.data),
                finallyCallback: () => setLoading(false),
            })
        }
    }, [])

    return (
        <div className="Contracts-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <SearchField values={values.search} onChange={handleChange} loading={loading} />
                    </Form>
                )}
            </Formik>
            {loading ? (
                skeletons.map((item) => <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />)
            ) : (
                <ContractList contracts={contracts} />
            )}
        </div>
    )
}
