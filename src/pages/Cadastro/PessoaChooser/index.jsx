import { useEffect } from "react"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { useClient } from "../../../hooks/useClient"
import { useStage } from "../../../hooks/useStage"
import {ReactComponent as ChoseIcon} from '../../../images/check.svg'
import {ReactComponent as ForwardArrowBlue} from '../../../images/forward_arrow_small_blue.svg';

export const PessoaChooser = ({ pessoa, setPessoa }) => {
        
    const Pessoa = ({ name, value, description }) => {
        const [clicked, setClicked] = useState(false)

        const nextStage = () => {
            client.setValue({...client.value, pessoa: value})
            setPessoa(value)
            setTimeout(() => {
                navigate('/cadastro/formulario')
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
                    <p>{description}</p>
                </div>
                <div className="chose-container" style={{ backgroundColor: clicked ? "#384974" : "white" }}>
                    {clicked ? (
                        <ChoseIcon style={isMobile ? { height: "18vw", width: "18vw" } : {}} />
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
    const isMobile = useMediaQuery({maxWidth: 600})
    const { setStage, setBar } = useStage()

    useEffect(() => {
    }, [])

    return (
        <div className="pessoa-wrapper">
            <Pessoa name='Pessoa Física' value='fisica' description={''} />
            <Pessoa name='Pessoa Jurídica' value='juridica' description={''} />
        </div>
    )
}