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

export const Fatura = ({ setProgressBarStage, setStage }) => {

    const CurrentSupplier = () => {
        const [unitError, setUnitError] = useState(false)

        const onSubmit = values => {
            setUnitError(false)

            if (!values.unit) {
                setUnitError(true)
                return
            }

            client.setValue({...client.value, supplier: values.supplier, unit: values.unit})
            navigate('/cadastro/calculadora')
        }

        return (
            <Formik initialValues={{supplier: suppliers[0].name, unit: client?.value?.unit || ''}} onSubmit={onSubmit} innerRef={formRef} >
                {({values, handleChange}) => (
                    <Form>
                        <InputField select id='supplier' title='Distribuidora atual' handleChange={handleChange} value={values.supplier} >
                            {suppliers.map(supplier => <MenuItem key={supplier.id}
                                value={supplier.name}
                                style={{width: '100%'}}
                            >{supplier.name}</MenuItem>)}
                        </InputField>
                        <InputField title='Unidade consumidora' innerRef={unitRef} id={'unit'} handleChange={handleChange} value={values.unit} error={unitError} errorText={'Campo obrigatório'} />

                    </Form>
                )}
            </Formik>
        )
    }

    const formRef = useRef(null)
    const unitRef = useRef(null)

    const navigate = useNavigate()
    const client = useClient()
    const suppliers = useSuppliers()

    const goBack = () => {
        setStage(0)
        navigate('/cadastro/formulario')
    }

    const nextStage = () => {
        const unit = unitRef
        console.log({unit})
        formRef.current.submitForm()
    }


    useEffect(() => {
        setProgressBarStage(50)
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