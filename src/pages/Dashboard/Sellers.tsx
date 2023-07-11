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
                                content:
                                    "Essa ação não poderá ser desfeita. Os dados do vendedor serão perdidos. Deseja continuar?",
                                onConfirm: () => {
                                    setDeleteLoading(true)
                                    api.user.delete({
                                        data: { id: seller.id },
                                        callback: (response: { data: User }) => {
                                            snackbar({ severity: "warning", text: "Vendedor deletado" })
                                            setSellers(sellers.filter((item) => item.id != response.data.id))
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

    const [sellers, setSellers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const initialValues = { search: "" }

    const handleSubmit = (values: FormValues) => {
        if (loading) return

        setLoading(true)
        api.user.find.name({
            data: values,
            callback: (response: { data: User[] }) => setSellers(response.data),
            finallyCallback: () => setLoading(false),
        })
    }
    const skeleton_style: SxProps = {
        width: "100%",
        height: "3.5vw",
        flexShrink: 0,
    }

    useEffect(() => {
        api.user.list({
            callback: (response: { data: User[] }) => setSellers(response.data),
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return (
        <div className="Sellers-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <SearchField values={values} onChange={handleChange} loading={loading} />
                    </Form>
                )}
            </Formik>
            <p>Administradores</p>
            <div className="sellers-list">
                {loading ? (
                    skeletons.map((item) => (
                        <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />
                    ))
                ) : (
                    <SellerList sellers={sellers.filter((seller) => seller.adm)} />
                )}
            </div>
            <p>Vendedores</p>
            <div className="sellers-list">
                {loading ? (
                    skeletons.map((item) => (
                        <Skeleton key={skeletons.indexOf(item)} variant="rectangular" sx={skeleton_style} />
                    ))
                ) : (
                    <SellerList sellers={sellers.filter((seller) => !seller.adm)} />
                )}
            </div>
        </div>
    )
}
