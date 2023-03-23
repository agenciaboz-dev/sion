import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import { PessoaJuridica } from './PessoaJuridica';
import { PessoaFisica } from './PessoaFisica';
import './style.scss';
import { ScrollTop } from '../../../components/ScrollTop';


export const Formulario = ({ pessoa, setStage, setProgressBarStage, setPessoa }) => {

    const navigate = useNavigate()
    const client = useClient()

    const nextStage = (values) => {
        client.setValue({...client.value, form: values})
        navigate('/cadastro/anexos')
    }

    const previousStage = (event) => {
        event.preventDefault()
        setPessoa(null)
        navigate('/cadastro')
    }
    
    useEffect(() => {
        setStage(0)
        setProgressBarStage(34)
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