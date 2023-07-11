import React, { useEffect, useState } from "react"
import "./style.scss"
import { useApi } from "../../hooks/useApi"
import { Button, Skeleton, SxProps, TextField } from "@mui/material"
import { useArray } from "burgos-array"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Form, Formik } from "formik"
import { SearchField } from "../../components/SearchField"
import { useContracts } from "../../hooks/useContracts"

interface FormValues {
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
    const skeletons = useArray().newArray(6)
    const api = useApi()

    const { user } = useUser()
    const contracts = useContracts()

    const [contractList, setContractList] = useState<Contract[]>(contracts.list)

    const handleSearch = (value: string) => {
        const searchResult = contracts.list.filter((contract) => contract.name.toLowerCase().includes(value))
        setContractList(searchResult)
    }

    const skeleton_style: SxProps = {
        width: "100%",
        height: "5vw",
        flexShrink: 0,
    }

    useEffect(() => {
        setContractList(contracts.list)
    }, [contracts.list])

    return (
        <div className="Contracts-Component">
            <SearchField onChange={handleSearch} loading={contracts.loading} />
            {contracts.loading ? (
                skeletons.map((item) => <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />)
            ) : (
                <ContractList contracts={contractList} />
            )}
        </div>
    )
}
