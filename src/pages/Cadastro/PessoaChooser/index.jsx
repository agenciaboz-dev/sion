import { useEffect } from "react"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { useClient } from "../../../hooks/useClient"
import {ReactComponent as ChoseIcon} from '../../../images/check.svg'

export const PessoaChooser = ({ setStage, setProgressBarStage, pessoa, setPessoa }) => {
        
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
                <div className="chose-container" style={{opacity: clicked ? 1 : 0.4}}>
                    {clicked ? <ChoseIcon style={isMobile && {height:'11vw', width: '11vw'}} /> : <div className="circle"></div> }
                </div>
            </div>
        )
    }

    const navigate = useNavigate()
    const client = useClient()
    const isMobile = useMediaQuery({maxWidth: 600})
    

    useEffect(() => {
        setProgressBarStage(38)
        setStage(0)
    }, [])

    return (
        <div className="pessoa-wrapper">
            <Pessoa name='Pessoa Física' value='fisica' description={''} />
            <Pessoa name='Pessoa Jurídica' value='juridica' description={''} />
        </div>
    )
}