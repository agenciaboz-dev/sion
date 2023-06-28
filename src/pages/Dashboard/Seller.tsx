import React, { useEffect, useState } from "react"
import "./style.scss"
import { useNavigate, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { User } from "../../definitions/user"
import { Button, CircularProgress, Skeleton, SxProps, TextField, Box, MenuItem } from "@mui/material"
import { Form, Formik } from "formik"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../../hooks/useUser"
import { useConfirmDialog } from "burgos-confirm"
import { ContractContainer } from "./Contracts"
import { useRoles } from "../../hooks/useRoles"
import { useCpfMask, useCepMask, usePhoneMask } from "burgos-masks"
import MaskedInput from "react-text-mask"
interface SellerProps {}

interface FormValues {
    password: string
}

export const Seller: React.FC<SellerProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()
    const roles = useRoles()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { user } = useUser()

    const [seller, setSeller] = useState<User>()
    const [idError, setIdError] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordError, setPasswordError] = useState("")

    const initialValues: FormValues = {
        password: "",
    }

    const skeleton_style: SxProps = {
        width: "100%",
        flexShrink: 0,
    }

    const textfield_style = {
        padding: "0vw",
    }

    const handlePasswordSubmit = (values: FormValues) => {
        if (passwordLoading) return

        if (!values.password) {
            setPasswordError("Nova senha não pode ser vazia")
            return
        }

        confirm({
            title: "Alterar senha",
            content: "Deseja alterar a senha do usuário?",
            onConfirm: () => {
                setPasswordLoading(true)
                setPasswordError("")

                api.user.password({
                    data: { password: values.password, id: seller!.id },
                    callback: (response: { data: User }) => {
                        setSeller(response.data)
                        snackbar({
                            severity: "success",
                            text: "Senha atualizada",
                        })
                    },
                    finallyCallback: () => setPasswordLoading(false),
                })
            },
        })
    }

    useEffect(() => {
        if (!id) navigate("/dashboard/sellers")

        api.user.find.id({
            data: { id },
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    setSeller(user)
                } else {
                    setIdError(true)
                }
            },
        })
    }, [])

    return id ? (
        <div className="Seller-Component">
            {idError ? (
                <div className="user-error">
                    <p>Usuário não encontrado</p>
                </div>
            ) : !seller ? (
                <>
                    <Skeleton variant="rectangular" sx={skeleton_style} height={"21vw"} />
                </>
            ) : (
                <>
                    <div className="info-container">
                        <div className="data-container">
                            <p>Dados Pessoais</p>
                            <TextField
                                label={"Nome"}
                                value={seller.name}
                                InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                            />
                            <MaskedInput
                                mask={useCpfMask}
                                guide={false}
                                name="cpf"
                                value={seller.cpf}
                                render={(ref, props) => (
                                    <TextField
                                        label={"CPF"}
                                        inputRef={ref}
                                        {...props}
                                        InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                    />
                                )}
                            />

                            <TextField
                                label={"E-mail"}
                                value={seller.email}
                                InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                            />
                            <TextField
                                label={"Data de nascimento"}
                                value={new Date(seller.birth).toLocaleDateString()}
                                InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                            />
                        </div>
                        <div className="data-container">
                            <TextField
                                label={"Função"}
                                value={seller.role}
                                InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                select
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.id}>
                                        {role.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={usePhoneMask}
                                    name="phone"
                                    guide={false}
                                    value={seller.phone}
                                    render={(ref, props) => (
                                        <TextField
                                            label={"Telefone"}
                                            sx={{ width: "50%" }}
                                            inputRef={ref}
                                            {...props}
                                            InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                        />
                                    )}
                                />
                                <MaskedInput
                                    mask={useCepMask}
                                    name="cep"
                                    guide={false}
                                    value={seller.cep}
                                    render={(ref, props) => (
                                        <TextField
                                            label={"CEP"}
                                            inputRef={ref}
                                            {...props}
                                            sx={{ width: "50%" }}
                                            InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                        />
                                    )}
                                />
                            </Box>

                            <TextField
                                label={"Endereço"}
                                value={seller.address}
                                InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                            />
                            <div className="number-district">
                                <TextField
                                    label={"Número"}
                                    value={seller.number}
                                    sx={{ width: "30%" }}
                                    InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                />
                                <TextField
                                    label={"Bairro"}
                                    value={seller.district}
                                    sx={{ width: "70%" }}
                                    InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                />
                            </div>
                        </div>
                    </div>

                    {user!.adm && (
                        <>
                            <div className="password-container">
                                <Formik initialValues={initialValues} onSubmit={handlePasswordSubmit}>
                                    {({ values, handleChange }) => (
                                        <Form>
                                            <p>Alterar senha do vendedor</p>
                                            <TextField
                                                name="password"
                                                type="password"
                                                label={"Atualizar senha"}
                                                value={values.password}
                                                onChange={handleChange}
                                                InputProps={{ sx: textfield_style }}
                                                error={Boolean(passwordError)}
                                                helperText={passwordError}
                                            />
                                            <Button type="submit" variant="contained">
                                                {passwordLoading ? (
                                                    <CircularProgress size={"1.5rem"} sx={{ color: "white" }} />
                                                ) : (
                                                    "Alterar senha"
                                                )}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>

                            <p>Contratos</p>
                            {seller.contracts.map((contract) => (
                                <ContractContainer key={contract.id} contract={contract} adm />
                            ))}
                        </>
                    )}
                </>
            )}
        </div>
    ) : (
        <></>
    )
}
