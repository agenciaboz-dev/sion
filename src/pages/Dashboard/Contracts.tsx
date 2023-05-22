import React, { useEffect, useState } from "react"
import "./style.scss"
import { useApi } from "../../hooks/useApi"
import { Contract } from "../../definitions/contract"
import { Button, Skeleton, SxProps } from "@mui/material"
import { useIndexedList } from "../../hooks/useIndexedList"
import { useNavigate } from "react-router-dom"

interface ContractsProps {}

const ContractContainer = ({ contract }: { contract: Contract }) => {
    const navigate = useNavigate()

    return (
        <div className="contract-container">
            <p className="title">
                {contract.name} / {contract.unit}
            </p>

            <div className="info">
                <div className="data">
                    <p>Vendedor responsável: </p>
                    <p>Vigente até: </p>
                </div>
                <div className="value">
                    <p>{contract.seller.name}</p>
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
    const { newArray } = useIndexedList()
    const skeletons = newArray(6)
    const api = useApi()

    const [contracts, setContracts] = useState<Contract[]>([])
    const [loading, setLoading] = useState(true)
    const [contract, setContract] = useState<Contract>()

    const skeleton_style: SxProps = {
        width: "100%",
        height: "5vw",
        flexShrink: 0,
    }

    useEffect(() => {
        console.log(contracts)
    }, [contracts])

    useEffect(() => {
        api.contracts.list({
            callback: (response: { data: Contract[] }) => setContracts(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return (
        <div className="Contracts-Component">
            {loading
                ? skeletons.map((item) => (
                      <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />
                  ))
                : contracts.map((contract) => <ContractContainer key={contract.id} contract={contract} />)}
        </div>
    )
}
