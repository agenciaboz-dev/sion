import React, { useEffect, useState } from "react"
import "./style.scss"
import { useIndexedList } from "../../hooks/useIndexedList"
import { useApi } from "../../hooks/useApi"
import { User } from "../../definitions/user"
import { Button, Skeleton, SxProps } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface SellersProps {}

const SellerContainer = ({ seller }: { seller: User }) => {
    const navigate = useNavigate()

    return (
        <div className="seller-container">
            <p className="title">{seller.name}</p>

            <div className="data">
                <p>E-mail: {seller.email}</p>
                <p>CPF: {seller.cpf}</p>
            </div>

            <div className="data">
                <p>Contratos pendentes: {seller.contracts.filter((contract) => !contract.active).length}</p>
                <p>Contratos verificados: {seller.contracts.filter((contract) => contract.active).length}</p>
            </div>

            <Button onClick={() => navigate(`/dashboard/seller/${seller.id}`)} variant="contained">
                Detalhes
            </Button>
        </div>
    )
}

export const Sellers: React.FC<SellersProps> = ({}) => {
    const { newArray } = useIndexedList()
    const skeletons = newArray(6)
    const api = useApi()

    const [sellers, setSellers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const skeleton_style: SxProps = {
        width: "100%",
        height: "5vw",
        flexShrink: 0,
    }

    useEffect(() => {
        console.log(sellers)
    }, [sellers])

    useEffect(() => {
        api.user.list({
            callback: (response: { data: User[] }) => setSellers(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return (
        <div className="Sellers-Component">
            {loading
                ? skeletons.map((item) => (
                      <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />
                  ))
                : sellers.map((seller) => <SellerContainer key={seller.id} seller={seller} />)}
        </div>
    )
}
