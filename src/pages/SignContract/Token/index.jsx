import { useEffect } from 'react';
import { useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { api } from '../../../api';
import { useColors } from '../../../hooks/useColors';
import { useUser } from '../../../hooks/useUser';
import { SafeEnvironment } from '../SafeEnvironment';
import { useParams } from 'react-router-dom'
import { useMediaQuery } from "@mui/material"

export const Token = ({ setOpenSnackbar, setError, setStage, contract }) => {
    const [user, setUser] = useUser()
    const colors = useColors()
    const signing = useParams().signing
    const isMobile = useMediaQuery("(orientation: portrait)")
    const [invalid, setInvalid] = useState(false)

    const [inputStyle, setInputStyle] = useState({
        fontFamily: "Poppins",
        MozAppearance: "textfield",
        textAlign: "center",
        height: isMobile ? "15vw" : "3vw",
        width: isMobile ? "15vw" : "3vw",
        borderRadius: isMobile ? "2vw" : "0.2vw",
        border: "none",
        outline: "none",
        fontSize: isMobile ? "10vw" : "1vw",
        fontWeight: "bold",
    })

    const handleChange = (values) => {
        if (values.length == 5) {
            verifyToken(values)
        } else {
            setInvalid(false)
        }
    }

    const verifyToken = (value) => {
        if (value == contract.token) {
            const data = {
                id: contract.id,
                name: user?.name || contract.name,
                email: user?.email || contract.email,
                cpf: user?.cpf || contract.cpf,
                cnpj: contract.cnpj,
                user: user,
                biometry: contract.biometry,
                rubric: contract.rubric,
                signing,
            }

            api.post("/contract/sign", data)
                .then((response) => console.log(response.data))
                .catch((error) => console.error(error))

            setStage(3)
        } else {
            setInvalid(true)
            setOpenSnackbar(true)
            setError("Token inválido")
        }
    }

    useEffect(() => {
        if (invalid) {
            setInputStyle({ ...inputStyle, boxShadow: `0 0 2px 2px ${colors.red}` })
        } else {
            setInputStyle({ ...inputStyle, boxShadow: "0 0 5px 0 #999" })
        }
    }, [invalid])

    return (
        <div className="Token-Component">
            <h3>Enviamos um TOKEN para o e-mail{signing == "client" && " e whatsapp"} do signatário</h3>
            {/* <ReactCodeInput type="number" fields={5} onComplete={verifyToken} /> */}
            <div className="token-insert-container">
                <p className="insert-token">Insira o Token:</p>
                <ReactCodeInput
                    className="code-container"
                    onChange={handleChange}
                    type="text"
                    fields={5}
                    onComplete={verifyToken}
                    inputMode="numeric"
                    inputStyle={inputStyle}
                />
                <p className="resend-token-button">Reenviar token via e-mail</p>
            </div>
            <SafeEnvironment />
        </div>
    )
}