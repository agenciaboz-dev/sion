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

export const Fatura = ({ setProgressBarStage, setStage }) => {

    const CurrentSupplier = () => {
        const onSubmit = values => {
            // if (!client.value.anexos) {
            //     setFileError(true)
            //     return
            // }
            client.setValue({...client.value, supplier: values.supplier})
            navigate('/cadastro/calculadora')
        }

        return (
            <Formik initialValues={{supplier: 0}} onSubmit={onSubmit} innerRef={formRef} >
                {({values, handleChange}) => (
                    <Form>
                        <InputField select id='supplier' title='Distribuidora atual' handleChange={handleChange} value={values.supplier} >
                            <MenuItem
                                value={0}
                                style={{width: '100%'}}
                            >Copel</MenuItem>
                        </InputField>
                    </Form>
                )}
            </Formik>
        )
    }

    const formRef = useRef(null)

    const navigate = useNavigate()
    const client = useClient()


    const goBack = () => {
        setStage(0)
        navigate('/cadastro/formulario')
    }

    const nextStage = () => {
        formRef.current.submitForm()
    }


    useEffect(() => {
        setProgressBarStage(68.3)
        setStage(1)

    }, [])
    
    return (
        <div className='Fatura-Component' >
            <ScrollTop />
            <CurrentSupplier />
            <UploadContainer title={'Anexar a fatura'} identifier='fatura' />
            <UploadContainer title={client?.value?.pessoa == 'juridica' ? 'Anexar o contrato social' : 'Anexar documentos'} identifier='documentos' />
            <NavButtons goBack={goBack} nextStage={nextStage} />
        </div>
    )
}