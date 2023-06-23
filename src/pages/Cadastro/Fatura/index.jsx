import { Alert, MenuItem, Snackbar } from '@mui/material';
import { CustomDashedBorder } from 'custom-dashed-border';
import { Form, Formik } from 'formik';
import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/InputField';
import { MuiLoading } from '../../../components/MuiLoading';
import { useClient } from '../../../hooks/useClient';

import './style.scss';
import COLORS from '../../../sass/_colors.scss'
import { ScrollTop } from '../../../components/ScrollTop';
import { UploadContainer } from './UploadContainer';
import { NavButtons } from '../NavButtons';
import { useSuppliers } from '../../../hooks/useSuppliers';
import { useContract } from '../../../hooks/useContract';
import { usePdf } from '../../../hooks/usePdf';

export const Fatura = ({ setProgressBarStage, setStage }) => {

    const navigate = useNavigate()
    const client = useClient()
    const contract = useContract()
    const [pdf, setPdf] = usePdf()

    const [loading, setLoading] = useState(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const goBack = () => {
        setStage(0)
        navigate('/cadastro/formulario')
    }

    const nextStage = () => {
        if (!client?.value?.anexos?.fatura) {
            setOpenSnackbar(true)
            return
        }
        
        setLoading(true)
        contract.generate((response) => {
            console.log(response)
            setPdf(response.data)
            navigate('/cadastro/contrato')
        },
        () => setLoading(false))
    }


    useEffect(() => {
        if (!client?.value?.name) navigate('/cadastro')

        setProgressBarStage(50)
        setStage(1)

        contract.lead()

    }, [])
    
    return (
        <div className='Fatura-Component' >
            <ScrollTop />
            <div className="fatura-uploads">
                <UploadContainer className="upload-container" title={'Anexar fatura'} identifier='fatura' />
                <UploadContainer className="upload-container" title={client?.value?.pessoa == 'juridica' ? 'Anexar contrato social' : 'Anexar documentos'} identifier='documentos' />
            </div>
            <NavButtons goBack={goBack} nextStage={nextStage} children={loading && <MuiLoading size='5vw' />} />

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={'error'} sx={{ width: '100%' }}>
                    Fatura obrigatória
                </Alert>
            </Snackbar>
        </div>
    )
}