import React, { useState } from "react"
import "./style.scss"
import { Form, Formik } from "formik"
import { User } from "../../definitions/user"
import { TextField, Button, SxProps, CircularProgress } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useConfirmDialog } from "../../hooks/useConfirmDialog"

interface ProfileProps {
    user: User
}

interface FormValues extends User {
    new_password: string
    new_email: string
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const initialValues: FormValues = { ...user, password: "", new_password: "", new_email: "" }

    const api = useApi()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()

    const [infoLoading, setInfoLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")
    const [emailLoading, setEmailLoading] = useState(false)

    const button_style: SxProps = {
        width: "50%",
    }

    const loading_props = {
        size: "1.5rem",
        sx: { color: "white" },
    }

    const handleInfoSubmit = (values: FormValues) => {
        confirm({
            title: "Atualizar perfil",
            content: "Deseja alterar os dados do seu perfil?",
            onConfirm: () => {
                setInfoLoading(true)
                console.log({ data: { ...values, contracts: [] } })

                api.user.update({
                    data: { ...values, contracts: [] },
                    callback: (response: { data: User }) => {
                        setUser(response.data)
                        snackbar({
                            severity: "success",
                            text: "Usuário atualizado",
                        })
                    },
                    finallyCallback: () => setInfoLoading(false),
                })
            },
        })
    }

    const handlePasswordSubmit = (values: FormValues) => {
        setPasswordError("")
        setNewPasswordError("")

        if (!values.new_password) {
            setNewPasswordError("Nova senha não pode ser vazia")
            return
        }

        if (values.password != user.password) {
            setPasswordError("Senha atual inválida")
            return
        }

        confirm({
            title: "Atualizar senha",
            content: "Certeza que deseja atualizar a sua senha?",
            onConfirm: () => {
                setPasswordLoading(true)

                api.user.password({
                    data: { password: values.new_password, id: user.id },
                    callback: (response: { data: User }) => {
                        setUser(response.data)
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

    const handleEmailSubmit = (values: FormValues) => {
        if (!values.new_email) return

        confirm({
            title: "Alterar e-mail",
            content: "Certeza que deseja alterar o seu e-mail?",
            onConfirm: () => {
                setEmailLoading(true)

                api.user.update({
                    data: { email: values.new_email, id: user.id },
                    callback: (response: { data: User }) => {
                        setUser(response.data)
                        snackbar({
                            severity: "success",
                            text: "E=mail atualizado",
                        })
                    },
                    finallyCallback: () => setEmailLoading(false),
                })
            },
        })
    }

    return (
        <div className="Profile-Component">
            <div className="main-container">
                <Formik initialValues={initialValues} onSubmit={handleInfoSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <p>Perfil</p>
                            <TextField
                                label="Nome de usuário"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField label="Nome" name="name" value={values.name} onChange={handleChange} />
                            <TextField label="Telefone" name="phone" value={values.phone} onChange={handleChange} />
                            <Button type="submit" variant="contained" sx={{ width: "25%" }}>
                                {infoLoading ? <CircularProgress {...loading_props} /> : "Salvar"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>

            <div className="main-container">
                <Formik initialValues={initialValues} onSubmit={handlePasswordSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <p>Redefinir senha</p>
                            <TextField
                                label="Senha"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={Boolean(passwordError)}
                                helperText={passwordError}
                            />
                            <TextField
                                label="Nova senha"
                                name="new_password"
                                type="password"
                                value={values.new_password}
                                onChange={handleChange}
                                error={Boolean(newPasswordError)}
                                helperText={newPasswordError}
                            />
                            <Button type="submit" variant="contained" sx={button_style}>
                                {passwordLoading ? <CircularProgress {...loading_props} /> : "Redefinir senha"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Formik initialValues={initialValues} onSubmit={handleEmailSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <p>Redefinir e-mail</p>
                            <TextField
                                label="E-mail"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Novo e-mail"
                                name="new_email"
                                value={values.new_email}
                                onChange={handleChange}
                                type="email"
                            />
                            <Button type="submit" variant="contained" sx={button_style}>
                                {emailLoading ? <CircularProgress {...loading_props} /> : "Redefinir e-mail"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
