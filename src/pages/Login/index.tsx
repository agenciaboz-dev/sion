import { Button, Checkbox, FormControlLabel } from "@mui/material"
import { Form, Formik } from "formik"
import { useEffect, useLayoutEffect, useState } from "react"
import { Footer } from "../../components/Footer"
import { InputField } from "../../components/InputField"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { ReactComponent as LogoEscuro } from "../../images/logo_bonita.svg"
import "./style.scss"
import { useUser } from "../../hooks/useUser"
import { useNavigate, useParams } from "react-router-dom"
import { MuiLoading } from "../../components/MuiLoading"
import { Header } from "../../components/Header"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"

interface FormValues {
    user: string
    password: string
}

export const Login = () => {
    const storage = useLocalStorage()
    const { setUser } = useUser()
    const navigate = useNavigate()
    const api = useApi()

    const [remind, setRemind] = useState(storage.get("remindme"))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const tryLogin = (values: FormValues) => {
        setLoading(true)
        setError(false)

        api.login({
            data: values,
            callback: (response: { data: User }) => {
                if (response.data) {
                    const usuario = response.data
                    storage.set("user_sion", remind ? usuario : null)
                    setUser(usuario)
                    navigate("/dashboard")
                } else {
                    setError(true)
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    useEffect(() => {
        storage.set("remindme", remind)
    }, [remind])

    useEffect(() => {}, [])

    return (
        <div className="Login-Page">
            <div className="main-container" style={{}}>
                <LogoEscuro />
                <Formik initialValues={{ user: "", password: "" }} onSubmit={(values) => tryLogin(values)}>
                    {({ handleChange, values, submitForm, errors }) => (
                        <Form>
                            <div className="user-input-container">
                                <label>Nome de usuário ou e-mail</label>
                                <InputField
                                    title={""}
                                    id={"user"}
                                    handleChange={handleChange}
                                    value={values.user}
                                    error={Boolean(errors.user)}
                                    errorText={errors.user}
                                />
                            </div>
                            <div className="password-input-container">
                                <label>Senha</label>
                                <InputField
                                    title={""}
                                    type="password"
                                    id={"password"}
                                    handleChange={handleChange}
                                    value={values.password}
                                    error={error}
                                    errorText={"Não foi possível fazer login"}
                                />
                            </div>
                            <div className="bottom-container">
                                <p>Perdeu a senha?</p>
                                <div className="button-container">
                                    <button type="submit">{loading ? <MuiLoading /> : "Entrar"}</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    )
}
