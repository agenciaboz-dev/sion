import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import { PessoaJuridica } from './PessoaJuridica';
import { PessoaFisica } from './PessoaFisica';
import './style.scss';


export const Formulario = ({ pessoa, setStage, setProgressBarStage, setPessoa }) => {

    const navigate = useNavigate()
    const client = useClient()

    const nextStage = (values, error) => {
        if (!error) client.setValue({...client.value, ...values})
        
        navigate(`/cadastro/${pessoa == 'juridica' ? 'formulario/representante' : 'anexos'}`)
    }

    const previousStage = (event) => {
        event.preventDefault()
        setPessoa(null)
        navigate('/cadastro/pessoa')
    }
    
    useEffect(() => {
        if (!client?.value?.unit) navigate('/cadastro')
        setStage(0)
        setProgressBarStage(32.5)
    }, [])

    return (
        <div className='Formulario-Component' >
            { pessoa == 'fisica' 
            ? 
            <PessoaFisica nextStage={nextStage} previousStage={previousStage} /> 
            : 
            <PessoaJuridica nextStage={nextStage} previousStage={previousStage} /> 
            }
        </div>
    )
}