import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import { PessoaJuridica } from './PessoaJuridica';
import { PessoaFisica } from './PessoaFisica';
import './style.scss';


export const Formulario = ({ pessoa, setProgressBarStage, setPessoa }) => {

    const navigate = useNavigate()
    const client = useClient()

    const nextStage = (values) => {
        client.setValue({...client.value, form: values})
        navigate('/cadastro/fatura')
    }

    const previousStage = (event) => {
        event.preventDefault()
        window.scrollTo(0, 200);
        setPessoa(null)
        navigate('/cadastro')
    }
    
    useEffect(() => {
        setProgressBarStage(34)
    }, [])

    return (
        <div className='Formulario-Component' >
            { pessoa == 'fisica' 
            ? 
            <PessoaFisica nextStage={nextStage} previousStage={previousStage} /> 
            : 
            // <PessoaJuridica nextStage={nextStage} previousStage={previousStage} /> 
            null
            }
        </div>
    )
}