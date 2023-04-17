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


        return (
            <div style={{position: 'fixed', gap: '5vw', bottom: '5vw'}}>
                <Button variant='contained' sx={{backgroundColor: 'white', color: colors.primary}} onClick={() => FileSaver.saveAs(url, contract.filename.split(contract.unit+'/')[1])} >Baixar</Button>
                <Button variant='contained' onClick={() => navigate('/login/'+contract.id)} >Assinar</Button>
            </div>
        )
    } 

    const id = useParams().id
    const colors = useColors()
    const navigate = useNavigate()
    const [ref, {width}] = useMeasure()

    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState([])
    const [url, setUrl] = useState('')
    const [contract, setContract] = useState(null)

    const onLoadSuccess = pdf => {
        setLoading(false)
        setPages([...Array(pdf.numPages)].map((_, index) => index + 1))
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
        <div className='Contract-Page' ref={ref} >
            <Document file={url} 
                onLoadSuccess={onLoadSuccess} onLoadError={(error) => console.error(error)}
                loading={<MuiLoading color={'primary'} size={'15vw'} noData={''} />}
                >
                {pages.map(page => <Page pageNumber={page} renderForms={false} width={width} />)}
            </Document>
            {!loading && <NavPdf />}
        </div>
    )
}