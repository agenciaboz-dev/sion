import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Document, Page, pdfjs } from 'react-pdf'
import { MuiLoading } from '../../components/MuiLoading';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss';
import { useColors } from '../../hooks/useColors';
import useMeasure from 'react-use-measure';
import { Button } from '@mui/material';
import FileSaver from 'file-saver';

export const Contract = ({  }) => {
    const NavPdf = () => {
        const button_style = {
            backgroundColor: colors.primary,
            color: 'white',
            width: '8vw',
            height: '8vw',
            justifyContent: 'center',
            alignItems: 'center'
        }

        const nextPage = () => {
            if ((page+1) <= pages) setPage(page+1)
        }

        const previousPage = () => {
            if ((page-1) > 0) setPage(page-1)
        }

        return (
            <div style={{flexDirection: 'column', gap: '5vw'}}>
                <div className="pdf-bottom" style={{justifyContent: 'center', gap: '10vw', alignItems: 'center'}}>
                    <div className="back-button" style={button_style} onClick={previousPage}>
                        <p>{'<'}</p>
                    </div>
                    <p>{page} / {pages}</p>
                    <div className="next-button" style={button_style} onClick={nextPage}>
                        <p>{'>'}</p>
                    </div>
                </div>
                <Button variant='contained' onClick={() => navigate('/login/'+contract.id)} >Assinar</Button>
                <Button variant='outlined' onClick={() => FileSaver.saveAs(url, contract.filename.split(contract.unit+'/')[1])} >Baixar</Button>
            </div>
        )
    } 

    const id = useParams().id
    const colors = useColors()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(5)
    const [pages, setPages] = useState(0)
    const [url, setUrl] = useState('')
    const [contract, setContract] = useState(null)

    const onLoadSuccess = pdf => {
        setLoading(false)
        setPages(pdf.numPages)
    }

    useEffect(() => {
        if (contract) {
            console.log(contract)
            setUrl(api.getUri().split('/api')[0]+'/'+contract.filename)
        }
    }, [contract])

    useEffect(() => {
        api.post('/contract', { id })
        .then(response => setContract(response.data))
        .catch(error => console.error(error))

    }, [])

    return (
        <div className='Contract-Page' >
            <Document file={url} 
                onLoadSuccess={onLoadSuccess} onLoadError={(error) => console.error(error)}
                loading={<MuiLoading color={'primary'} size={'15vw'} noData={''} />}
                >
                <Page pageNumber={page} renderForms={false} />
            </Document>
            {!loading && <NavPdf />}
        </div>
    )
}