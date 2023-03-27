import { MenuItem } from '@mui/material';
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

export const Fatura = ({ setProgressBarStage, setStage }) => {

    const navigate = useNavigate()
    const client = useClient()
    const contract = useContract()

    const goBack = () => {
        setStage(0)
        navigate('/cadastro/formulario')
    }

    const nextStage = () => {
        if (!client?.value?.anexos?.fatura) return
        
        navigate('/cadastro/contrato')
    }


    useEffect(() => {
        if (!client?.value?.form?.name) navigate('/cadastro')

        setProgressBarStage(50)
        setStage(1)

        contract.lead()

    }, [])
    
    return (
        <div className='Fatura-Component' >
            <ScrollTop />
            <UploadContainer title={'Anexar a fatura'} identifier='fatura' />
            <UploadContainer title={client?.value?.pessoa == 'juridica' ? 'Anexar o contrato social' : 'Anexar documentos'} identifier='documentos' />
            <NavButtons goBack={goBack} nextStage={nextStage} />
        </div>
    )
}