import React, { useState } from "react"
import "./style.scss"
import { Form, Formik } from "formik"
import { User } from "../../definitions/user"
import { TextField, Button, SxProps, CircularProgress } from "@mui/material"
import { useApi } from "../../hooks/useApi"

interface ProfileProps {
    user: User
}

interface FormValues extends User {
    new_password: string
    new_email: string
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const initialValues: FormValues = { ...user, new_password: "", new_email: "" }

    const api = useApi()

    const [infoLoading, setInfoLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [emailLoading, setEmailLoading] = useState(false)

    const button_style: SxProps = {
        width: "50%",
    }

    const loading_props = {
        size: "1.5rem",
        sx: { color: "white" },
    }

    const handleInfoSubmit = (values: FormValues) => {
        setInfoLoading(true)

        api.user.update({
            data: values,
            callback: (response: { data: User }) => {
                console.log(response.data)
            },
            finallyCallback: () => setInfoLoading(false),
        })
    }

    const handlePasswordSubmit = (values: FormValues) => {
        setPasswordLoading(true)

        api.user.password({
            data: { password: values.new_password, id: user.id },
            callback: (response: { data: User }) => {
                console.log(response.data)
            },
            finallyCallback: () => setPasswordLoading(false),
        })
    }

    const handleEmailSubmit = (values: FormValues) => {
        setEmailLoading(true)

        api.user.update({
            data: { email: values.new_email },
            callback: (response: { data: User }) => {
                console.log(response.data)
            },
            finallyCallback: () => setEmailLoading(false),
        })
    }

    return (
        <div className="Profile-Component">
            <div className="main-container">
                <Formik initialValues={initialValues} onSubmit={handleInfoSubmit}>
                    {({ values, handleChange }) => (
                        <Form style={{ flex: 0.5 }}>
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
                            <Button type="submit" variant="contained" sx={button_style}>
                                {infoLoading ? <CircularProgress {...loading_props} /> : "Salvar"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div className="password-email">
                    <Formik initialValues={initialValues} onSubmit={handlePasswordSubmit}>
                        {({ values, handleChange }) => (
                            <Form>
                                <p>Redefinir senha</p>
                                <TextField label="Senha" name="password" value={values.password} onChange={handleChange} />
                                <TextField
                                    label="Nova senha"
                                    name="new_password"
                                    value={values.new_password}
                                    onChange={handleChange}
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
                                <TextField label="Telefone" name="phone" value={values.phone} onChange={handleChange} />
                                <TextField label="Telefone" name="phone" value={values.phone} onChange={handleChange} />
                                <Button type="submit" variant="contained" sx={button_style}>
                                    {emailLoading ? <CircularProgress {...loading_props} /> : "Redefinir e-mail"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
