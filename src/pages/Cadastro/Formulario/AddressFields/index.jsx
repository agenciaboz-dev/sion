import { Alert, Snackbar } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { api } from '../../../../api';
import { EstadosSelect } from '../../../../components/EstadosSelect';
import { InputField } from '../../../../components/InputField';

export const AddressFields = ({ values, handleChange, errors }) => {

    const [openSnackbar, setOpenSnackbar] = useState(false)


    const { setFieldValue } = useFormikContext()

    const numberRef = useRef(null)

    const cepBlur = cep => {
        
    }

    useEffect(() => {
        if (values?.cep?.length == 10) {
            api.post('/cep', { cep: values.cep })
            .then(response => {
                const address = response.data
                console.log(address)
                if (address.erro) {
                    setOpenSnackbar(true)
                    return
                }
                setFieldValue('address', address.logradouro)
                setFieldValue('district', address.bairro)
                setFieldValue('city', address.localidade)
                setFieldValue('state', address.uf)
                numberRef.current.focus()
            })
        }
    }, [values.cep])
    
    return (
        <>
            <InputField title={'CEP'} onBlur={() => cepBlur(values.cep)} inputMode={'numeric'} mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id={'cep'} handleChange={handleChange} value={values.cep} error={Boolean(errors.cep)} errorText={errors.cep} />
            <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
            <div className="two-inputs">
                <InputField title={'Bairro'} id={'district'} handleChange={handleChange} value={values.district} error={Boolean(errors.district)} errorText={errors.district} />
                <InputField title={'Nº predial'} innerRef={numberRef} id={'number'} handleChange={handleChange} value={values.number} error={Boolean(errors.number)} errorText={errors.number} />
            </div>
            <div className="two-inputs">
                <InputField title={'Cidade'} id={'city'} handleChange={handleChange} value={values.city} error={Boolean(errors.city)} errorText={errors.city} />
                <EstadosSelect title={'Estado'} id={'state'} handleChange={handleChange} value={values.state} error={Boolean(errors.state)} errorText={errors.state} />
            </div>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={'error'} sx={{ width: '100%' }}>
                    CEP inválido
                </Alert>
            </Snackbar>

        </>
    )
}