import { Button, Checkbox, CircularProgress, FormControlLabel, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import { useEffect, useLayoutEffect, useState } from "react"
import { Footer } from "../../components/Footer"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { ReactComponent as LogoEscuro } from "../../images/logo_bonita.svg"
import "./style.scss"
import { useUser } from "../../hooks/useUser"
import { useNavigate, useParams } from "react-router-dom"
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
                                <TextField
                                    name={"user"}
                                    onChange={handleChange}
                                    value={values.user}
                                    error={Boolean(errors.user)}
                                    helperText={errors.user}
                                />
                            </div>
                            <div className="password-input-container">
                                <label>Senha</label>
                                <TextField
                                    type="password"
                                    name={"password"}
                                    onChange={handleChange}
                                    value={values.password}
                                    error={error}
                                    helperText={"Não foi possível fazer login"}
                                />
                            </div>
                            <div className="bottom-container">
                                <p>Perdeu a senha?</p>
                                <div className="button-container">
                                    <button type="submit">
                                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Entrar"}
                                    </button>
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