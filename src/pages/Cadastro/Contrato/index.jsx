import { useEffect, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';
import { useContract } from '../../../hooks/useContract';
import {ReactComponent as ChoseIcon} from '../../../images/blue_check.svg'
import './style.scss';
import { usePdf } from '../../../hooks/usePdf';
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Contrato = ({  }) => {
    const vw = window.innerHeight / 100

    const navigate = useNavigate()
    const client = useClient()
    const [pdf, setPdf] = usePdf()
    // const [url, setUrl] = useState(api.getUri()+'/documents/sion/76/contract.pdf')
    

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!client?.value?.unit) navigate('/cadastro')

        console.log(api.getUri())

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
                <Document file={api.getUri().split('/api')[0]+`/documents/sion/76/contract.pdf`} onLoadSuccess={() => null} onLoadError={(error) => console.error(error)}>
                    <Page pageNumber={1} width={270} />
                </Document>

            </div>

        </div>
    )
}