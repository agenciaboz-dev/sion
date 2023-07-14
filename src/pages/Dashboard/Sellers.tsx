import React, { useEffect, useState } from "react"
import "./style.scss"
import { useArray } from "burgos-array"
import { useApi } from "../../hooks/useApi"
import { Button, CircularProgress, IconButton, Skeleton, SxProps, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { useConfirmDialog } from "burgos-confirm"
import { useSnackbar } from "burgos-snackbar"
import { Form, Formik } from "formik"
import { SearchField } from "../../components/SearchField"
import { useSellers } from "../../hooks/useSellers"

interface SellersProps {}
interface FormValues {
    search: string
}

export const Sellers: React.FC<SellersProps> = ({}) => {
    const SellerList = ({ sellers }: { sellers: User[] }) => {
        return sellers.length > 0 ? (
            <>
                {sellers.map((seller) => (
                    <SellerContainer key={seller.id} seller={seller} />
                ))}
            </>
        ) : (
            <div className="empty" style={{ padding: "0.5vw 0" }}>
                <p>Nenhum resultado</p>
            </div>
        )
    }

    const SellerContainer = ({ seller }: { seller: User }) => {
        const navigate = useNavigate()
        const { user } = useUser()
        const { confirm } = useConfirmDialog()
        const { snackbar } = useSnackbar()

        const [deleteLoading, setDeleteLoading] = useState(false)

        const deleteUser = () => {
            if (deleteLoading) return

            confirm({
                title: "Deletar vendedor",
                content: "Tem certeza que deseja deletar o vendedor?",
                onConfirm: () => {
                    setTimeout(
                        () =>
                            confirm({
                                title: "Atenção",
                                content: "Essa ação não poderá ser desfeita. Os dados do vendedor serão perdidos. Deseja continuar?",
                                onConfirm: () => {
                                    setDeleteLoading(true)
                                    api.user.delete({
                                        data: { id: seller.id },
                                        callback: (response: { data: User }) => {
                                            sellers.remove(seller)
                                        },
                                        finallyCallback: () => setDeleteLoading(false),
                                    })
                                },
                            }),
                        500
                    )
                },
            })
        }

        return (
            <div className="seller-container">
                <p className="title" title={seller.name}>
                    {seller.name}
                </p>

                <div className="data">
                    <p>E-mail: {seller.email}</p>
                    {user!.adm && <p>CPF: {seller.cpf}</p>}
                </div>

                <div className="data">
                    <p>Contratos pendentes: {seller.contracts.filter((contract) => !contract.active).length}</p>
                    <p>Contratos verificados: {seller.contracts.filter((contract) => contract.active).length}</p>
                </div>

                {user!.adm && (
                    <div className="buttons-container" style={{ gap: "1vw" }}>
                        {!seller.adm && (
                            <IconButton color="error" onClick={deleteUser} disabled={seller.adm}>
                                {deleteLoading ? <CircularProgress size={"1.5rem"} color="error" /> : <DeleteForeverIcon />}
                            </IconButton>
                        )}
                        <Button onClick={() => navigate(`/dashboard/seller/${seller.id}`)} variant="contained">
                            Detalhes
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    const { newArray } = useArray()
    const skeletons = newArray(3)
    const api = useApi()

    const sellers = useSellers()

    const [sellerList, setSellerList] = useState<User[]>(sellers.list)
    const [searching, setSearching] = useState(false)

    const initialValues = { search: "" }

    const skeleton_style: SxProps = {
        width: "100%",
        height: "3.5vw",
        flexShrink: 0,
    }

    const onSearch = (value: string) => {
        setSearching(!!value)

        const searchResult = sellers.list.filter((seller) => seller.name.toLowerCase().includes(value))
        setSellerList(searchResult)
    }

    useEffect(() => {
        if (!searching) {
            setSellerList(sellers.list)
        }
    }, [sellers.list])

    return (
        <div className="Sellers-Component">
            <SearchField onChange={onSearch} loading={sellers.loading} sx={{}} />
            <p>Administradores</p>
            <div className="sellers-list">
                {sellers.loading ? (
                    skeletons.map((item) => (
                        <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />
                    ))
                ) : (
                    <SellerList sellers={sellerList.filter((seller) => seller.adm)} />
                )}
            </div>
            <p>Vendedores</p>
            <div className="sellers-list">
                {sellers.loading ? (
                    skeletons.map((item) => (
                        <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />
                    ))
                ) : (
                    <SellerList sellers={sellerList.filter((seller) => !seller.adm)} />
                )}
            </div>
        </div>
    )
}
