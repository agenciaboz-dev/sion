import React, { useEffect, useState } from "react"
import "./style.scss"
import { useNavigate, useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { Button, CircularProgress, Skeleton, SxProps, TextField, Box, MenuItem } from "@mui/material"
import { Form, Formik } from "formik"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../../hooks/useUser"
import { useConfirmDialog } from "burgos-confirm"
import { ContractContainer } from "./Contracts"
import { useRoles } from "../../hooks/useRoles"
import { useCpfMask, useCepMask, usePhoneMask } from "burgos-masks"
import MaskedInput from "react-text-mask"
import { useSellers } from "../../hooks/useSellers"
import { useDate } from "../../hooks/useDate"
interface SellerProps {}

interface FormValues {
    password: string
}

export const Seller: React.FC<SellerProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()
    const roles = useRoles()
    const sellers = useSellers()

    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { user } = useUser()
    const { getDateString } = useDate()

    const [seller, setSeller] = useState<User | undefined>(id ? sellers.get(id) : undefined)
    const [idError, setIdError] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [updateUserLoading, setUpdateUserLoading] = useState(false)

    const initialValues: FormValues = {
        password: "",
    }

    const userFormValues: User = seller!

    const skeleton_style: SxProps = {
        width: "100%",
        flexShrink: 0,
    }

    const textfield_style = {
        padding: "0vw",
    }

    const handleUpdateUser = (values: User) => {
        if (updateUserLoading) return

        confirm({
            title: "Atualizar usuário",
            content: "Confirma atualização do usuário?",
            onConfirm: () => {
                setUpdateUserLoading(true)
                api.user.update({
                    data: values,
                    callback: (response: { data: User }) => {
                        sellers.update(response.data)
                        setSeller(response.data)
                        snackbar({
                            severity: "success",
                            text: "Usuário atualizado",
                        })
                    },
                    finallyCallback: () => setUpdateUserLoading(false),
                })
            },
        })
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
                        sellers.update(response.data)
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
                        <Formik initialValues={userFormValues} onSubmit={handleUpdateUser}>
                            {({ values, handleChange }) => (
                                <Box sx={{ width: "100%" }}>
                                    <Form style={{ flexDirection: "column", display: "flex", gap: "1vw", width: "100%" }}>
                                        <Box sx={{ gap: "1vw", width: "100%" }}>
                                            <div className="data-container">
                                                <p>Dados Pessoais</p>
                                                <TextField
                                                    label={"Nome"}
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                />
                                                <MaskedInput
                                                    mask={useCpfMask}
                                                    guide={false}
                                                    name="cpf"
                                                    value={values.cpf}
                                                    onChange={handleChange}
                                                    render={(ref, props) => (
                                                        <TextField
                                                            label={"CPF"}
                                                            inputRef={ref}
                                                            {...props}
                                                            InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                        />
                                                    )}
                                                />

                                                <Box sx={{ gap: "1vw" }}>
                                                    <TextField
                                                        label={"Data de nascimento"}
                                                        name="birth"
                                                        value={getDateString(values.birth, true)}
                                                        onChange={handleChange}
                                                        InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                    />
                                                    <MaskedInput
                                                        mask={usePhoneMask}
                                                        name="phone"
                                                        guide={false}
                                                        value={values.phone}
                                                        onChange={handleChange}
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
                                                </Box>
                                                <TextField
                                                    label={"E-mail"}
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                />
                                            </div>
                                            <div className="data-container">
                                                <TextField
                                                    label={"Nome de Usuário"}
                                                    name="username"
                                                    value={values.username}
                                                    onChange={handleChange}
                                                    InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                    disabled
                                                />
                                                <TextField
                                                    label={"Função"}
                                                    name="role"
                                                    value={values.role}
                                                    onChange={handleChange}
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
                                                        mask={useCepMask}
                                                        name="cep"
                                                        guide={false}
                                                        value={values.cep}
                                                        onChange={handleChange}
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
                                                    <TextField
                                                        label={"Bairro"}
                                                        name="district"
                                                        value={values.district}
                                                        onChange={handleChange}
                                                        sx={{ width: "70%" }}
                                                        InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                    />
                                                </Box>
                                                <div className="number-district">
                                                    <TextField
                                                        sx={{ width: "70%" }}
                                                        label={"Endereço"}
                                                        name="address"
                                                        value={values.address}
                                                        onChange={handleChange}
                                                        InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                    />
                                                    <TextField
                                                        label={"Número"}
                                                        name="number"
                                                        value={values.number}
                                                        onChange={handleChange}
                                                        sx={{ width: "30%" }}
                                                        InputProps={{ readOnly: !user!.adm, sx: textfield_style }}
                                                    />
                                                </div>
                                            </div>
                                        </Box>
                                        <Button variant="contained" type="submit" sx={{ alignSelf: "flex-end" }}>
                                            {updateUserLoading ? <CircularProgress size={"1.5rem"} sx={{ color: "white" }} /> : "Atualizar usuário"}
                                        </Button>
                                    </Form>
                                </Box>
                            )}
                        </Formik>
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
                                                {passwordLoading ? <CircularProgress size={"1.5rem"} sx={{ color: "white" }} /> : "Alterar senha"}
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
