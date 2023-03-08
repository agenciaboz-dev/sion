import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const Contrato = ({ setProgressBarStage, setStage }) => {

    const navigate = useNavigate()

    const goBack = () => {
        setStage(1)
        navigate(-1)
    }

    const nextStage = () => {
        navigate('/cadastro/contrato')
    }

    useEffect(() => {
        setProgressBarStage(100)
        setStage(2)

    }, [])
    
    return (
        <div className='Contrato-Component' >
            <h1>click sign</h1>
            <div className="buttons-container">
                <button onClick={() => goBack()}>Voltar</button>
                <button onClick={() => nextStage()}>Avançar</button>
            </div>
        </div>
    )
}