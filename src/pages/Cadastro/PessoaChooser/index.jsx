import { useEffect } from "react"
import { useState } from "react"
import { useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useClient } from "../../../hooks/useClient"
import { useColors } from "../../../hooks/useColors"
import { useStage } from "../../../hooks/useStage"
import { ReactComponent as ChoseIcon } from "../../../images/check.svg"
import { ReactComponent as WhiteCircle } from "../../../images/white_circle.svg"

export const PessoaChooser = ({ pessoa, setPessoa }) => {
    const Pessoa = ({ name, value, description }) => {
        const [clicked, setClicked] = useState(false)
        const [backgroundColor, setBackgroundColor] = useState("white")

        const nextStage = () => {
            client.setValue({ ...client.value, pessoa: value })
            setPessoa(value)
            setTimeout(() => {
                navigate("/cadastro/formulario")
            }, 500)
        }

        useEffect(() => {
            console.log(backgroundColor)
        }, [backgroundColor])

        useEffect(() => {
            if (pessoa == value) {
                setClicked(true)
                setBackgroundColor(colors.primary)
            } else {
                setClicked(false)
                setBackgroundColor(colors.primary_light)
            }
        }, [pessoa])

        return (
            <div className="pessoa-container" onClick={() => nextStage()}>
                <div className="text-container">
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>
                <div className="chose-container" style={{ backgroundColor: backgroundColor }}>
                    {clicked ? (
                        <ChoseIcon style={isMobile ? { height: "8vw", width: "8vw" } : { height: "4vw", width: "4vw" }} />
                    ) : (
                        <div className="forward-arrow-container">
                            {<WhiteCircle style={ isMobile? {height: "8vw", width: "8vw "} : { height: "4vw", width: "4vw" }} />}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const navigate = useNavigate()
    const client = useClient()
    const isMobile = useMediaQuery("(orientation: portrait)")
    const colors = useColors()
    const { setStage, setBar } = useStage()

    useEffect(() => {}, [])

    return (
        <div className="pessoa-wrapper">
            <Pessoa
                name="Pessoa Física"
                value="fisica"
                description={
                    "Uma pessoa física pode ser identificada por meio de seus documentos pessoais, como CPF (Cadastro de Pessoa Física), RG (Registro Geral), carteira de motorista, entre outros. Ela é capaz de realizar transações financeiras, assinar contratos, adquirir bens e serviços, entre outras atividades."
                }
            />
            <Pessoa
                name="Pessoa Jurídica"
                value="juridica"
                description={
                    "Uma pessoa jurídica pode ser identificada por meio do seu CNPJ (Cadastro Nacional de Pessoa Jurídica), que é um registro único que identifica a empresa perante os órgãos públicos e as instituições financeiras. O CNPJ é composto por 14 dígitos e pode ser consultado por qualquer pessoa por meio do site da Receita Federal."
                }
            />
        </div>
    )
}