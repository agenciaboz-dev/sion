import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import {ReactComponent as ChoseIcon} from '../../../images/blue_check.svg'
import './style.scss';

export const Contrato = ({ setProgressBarStage, setStage }) => {

    const navigate = useNavigate()
    const client = useClient()

    const finish = () => {
        client.setValue(null)
        navigate('/')
    }

    useEffect(() => {
        setProgressBarStage(100)
        setStage(2)

    }, [])
    
    return (
        <div className='Contrato-Component' >
            <div className="main-container">
                <ChoseIcon style={{height:'11vw', width: '11vw'}} />
                <h1>Tudo pronto!</h1>
                <div className='description-container'>
                    <p>Foi enviado um email com as</p>
                    <p>informações recebidas!</p>
                </div>
                <button onClick={() => finish()}>Finalizar</button>
            </div>

            
        </div>
    )
}