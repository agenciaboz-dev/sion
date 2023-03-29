import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';
import { useContract } from '../../../hooks/useContract';
import {ReactComponent as ChoseIcon} from '../../../images/blue_check.svg'
import { Document, Page, pdfjs } from 'react-pdf'
import './style.scss';
import { usePdf } from '../../../hooks/usePdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Contrato = ({  }) => {
    const vw = window.innerHeight / 100

    const navigate = useNavigate()
    const client = useClient()
    const [pdf, setPdf] = usePdf()
    

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!client?.value?.unit) navigate('/cadastro')

        // console.log(pdf)
    }, [])
    
    return (
        <div className='Contrato-Component' >
            <div className="main-container">
                <div className="title-container">
                    <h1>Cadastrado!</h1>
                    <ChoseIcon style={{height:'11vw', width: '11vw'}} />
                </div>
                <div className='description-container'>
                    <p>Clique avançar para enviar o contrato por email para todos os envolvidos cadastrados!</p>
                </div>
                <Document file={'https://drive.google.com/file/d/1-K8YMzPbrOTEHNpIOrjHnW_JyZ5Rw1-g/view?usp=sharing'} onLoadSuccess={() => null} onLoadError={(error) => console.error(error)}>
                    <Page pageNumber={1} />
                </Document>

            </div>

        </div>
    )
}