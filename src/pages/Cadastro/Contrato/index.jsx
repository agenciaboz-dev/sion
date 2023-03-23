import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';
import {ReactComponent as ChoseIcon} from '../../../images/blue_check.svg'
import './style.scss';

export const Contrato = ({  }) => {
    const vw = window.innerHeight / 100

    const navigate = useNavigate()
    const client = useClient()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [qrCodeValue, setQrCodeValue] = useState('https://cooperativasion.com.br')

    const copyToClipboard = () => {
        navigator.clipboard.writeText(qrCodeValue)
    }

    useEffect(() => {
        const formData = new FormData();
        const data = { ...client.value, ...client.value?.form };
        delete data.form;

        formData.append("data", JSON.stringify(data));

        // Assuming you have the files in the `attachments` state
        const attachments = client.value.anexos;
        if (attachments) {
            Object.entries(attachments).forEach(([key, files]) => {
            files.forEach((file, index) => {
                formData.append(`${key}_${index}`, file);
                });
            });
        }

        api.post('/contract/new', formData)
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
                        <p>{error}</p>
                    </section>
                    :
                    <section>
                        <div className="title-container">
                            <h1>Cadastrado!</h1>
                            <ChoseIcon style={{height:'11vw', width: '11vw'}} />
                        </div>
                        <div className='description-container'>
                            <p>Foi enviado um email com as informações recebidas! Agora só falta o pagamento da taxa de adesão dos servços.</p>
                        </div>
                        <QRCode value={qrCodeValue} size={ 31*vw} />
                        <button onClick={() => copyToClipboard()}>Copiar código PIX</button>
                    </section>
                }
            </div>

        </div>
    )
}