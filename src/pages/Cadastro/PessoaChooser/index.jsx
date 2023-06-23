import { useEffect } from "react"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { useClient } from "../../../hooks/useClient"
import { useStage } from "../../../hooks/useStage"
import {ReactComponent as ChoseIcon} from '../../../images/check.svg'
import {ReactComponent as ForwardArrowBlue} from '../../../images/forward_arrow_small_blue.svg';
import { NavButtons } from "../NavButtons"

export const PessoaChooser = ({ pessoa, setPessoa }) => {
    const Pessoa = ({ name, value, description }) => {
        const [clicked, setClicked] = useState(false)

        const nextStage = () => {
            client.setValue({ ...client.value, pessoa: value })
            setPessoa(value)
            setTimeout(() => {
                navigate("/cadastro/formulario")
            }, 500)
        }

        useEffect(() => {
            if (pessoa == value) {
                setClicked(true)
            }
        }, [pessoa])

        return (
            <div className="pessoa-container" onClick={() => nextStage()}>
                <div className="text-container">
                    <h1>{name}</h1>
                    <p style={{ color: "333333", fontSize: "1vw" }}>{description}</p>
                </div>
                <div className="chose-container" style={{ backgroundColor: clicked ? "#384974" : " #38497461" }}>
                    {clicked ? (
                        <ChoseIcon style={{ height: "4vw", width: "4vw" }} />
                    ) : (
                        <div className="forward-arrow-container">
                            <ForwardArrowBlue />
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const navigate = useNavigate()
    const client = useClient()
    const isMobile = useMediaQuery({ maxWidth: 600 })
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