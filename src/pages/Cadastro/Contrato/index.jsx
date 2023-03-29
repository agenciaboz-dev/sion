import { useEffect, useState } from 'react';
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
import COLORS from '../../../sass/_colors.scss'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const Contrato = ({  }) => {

    const NavPdf = () => {
        const button_style = {
            backgroundColor: COLORS.primary,
            color: 'white',
            width: '8vw',
            height: '8vw',
            justifyContent: 'center',
            alignItems: 'center'
        }

        const nextPage = () => {
            setPage(page+1)
        }

        const previousPage = () => {
            if ((page-1) > 0) setPage(page-1)
        }

        return (
            <div className="pdf-bottom" style={{width: '100%',justifyContent: 'space-between'}}>
                <div className="back-button" style={button_style} onClick={previousPage}>
                    <p>{'<'}</p>
                </div>
                <p>{page}/4</p>
                <div className="next-button" style={button_style} onClick={nextPage}>
                    <p>{'>'}</p>
                </div>
            </div>
        )
    } 


    const navigate = useNavigate()
    const client = useClient()

    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

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
                <Document file={api.getUri().split('/api')[0]+`/documents/sion/${client.value.unit}/contract.pdf`} 
                    onLoadSuccess={() => setLoading(false)} onLoadError={(error) => console.error(error)}
                    loading={<MuiLoading color={'primary'} size={'15vw'} />}
                >
                    <Page pageNumber={page} width={245} />
                </Document>
                {!loading && <NavPdf />}
            </div>

        </div>
    )
}