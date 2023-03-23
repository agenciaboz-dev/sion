import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';
import {ReactComponent as ChoseIcon} from '../../../images/blue_check.svg'
import './style.scss';

export const Contrato = ({  }) => {

    const navigate = useNavigate()
    const client = useClient()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const finish = () => {
        client.setValue(null)
        navigate('/')
    }

    useEffect(() => {

        const data = {...client.value, ...client.value.form}
        delete data.form

        api.post('/contract/new', data)
        .then(response => {
            const data = response.data
            console.log(data)
            if (data.error) setError(data.error)
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))


    }, [])
    
    return (
        <div className='Contrato-Component' >
            <div className="main-container">
                {loading ?
                <div className="loading-container">
                    <MuiLoading color={'primary'} size={'15vw'} />
                </div>
                :
                error ?
                    <section>
                        <h1>Erro.</h1>
                        <p>{error} já cadastrado</p>
                    </section>
                    :
                    <section>
                        <ChoseIcon style={{height:'11vw', width: '11vw'}} />
                        <h1>Tudo pronto!</h1>
                        <div className='description-container'>
                            <p>Foi enviado um email com as</p>
                            <p>informações recebidas!</p>
                        </div>
                        <button onClick={() => finish()}>Finalizar</button>
                    </section>
                }
            </div>

            
        </div>
    )
}