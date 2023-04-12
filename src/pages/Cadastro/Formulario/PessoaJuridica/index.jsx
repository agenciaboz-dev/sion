import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../components/InputField';
import COLORS from '../../../../sass/_colors.scss'
import { useClient } from '../../../../hooks/useClient';
import { useState } from 'react';
import { useValidateCNPJ } from '../../../../hooks/useValidateCNPJ';
import { EstadosSelect } from '../../../../components/EstadosSelect';
import { AddressFields } from '../AddressFields';

export const PessoaJuridica = ({ previousStage, nextStage }) => {
    const default_errors = useValidationErrors()
    const client = useClient()
    const validateCNPJ = useValidateCNPJ()
    
    const [cnpjError, setCnpjError] = useState(false)

    const initial_inputs = client.value?.form ||  {
        company: '',
        cnpj: '',
        category: '',
        cep: '',
        address: '',
        district: '',
        number: '',
        city: '',
        state: '',
    }

    const validationSchema = object({
        company: string().required(default_errors.required),
        cnpj: string().length(18, default_errors.cnpj).required(default_errors.required),
        category: string().required(default_errors.required),
        cep: string().length(10, default_errors.cep).required(default_errors.required),
        address: string().required(default_errors.required),
        district: string().required(default_errors.required),
        number: string().required(default_errors.required),
        city: string().required(default_errors.required),
        state: string().required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
    })

    // 12.988.742/0001-56
    const cnpjBlur = event => {
        setCnpjError(!validateCNPJ(event.target.value))
    }

    return (
        <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values, cnpjError)} validationSchema={validationSchema}>
            {({handleChange, values, submitForm, errors}) => (
                <Form onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        submitForm();
                    }
                    }}>
                    <InputField title={'Razão Social'} id={'company'} handleChange={handleChange} value={values.company} error={Boolean(errors.company)} errorText={errors.company} />
                    <InputField title={'CNPJ'} onBlur={cnpjBlur} mask={[/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/]} inputMode={'numeric'} id={'cnpj'} handleChange={handleChange} value={values.cnpj} error={cnpjError} errorText={'CNPJ inválido'} />
                    <InputField title={'Ramo de atividade'} id={'category'} handleChange={handleChange} value={values.category} error={Boolean(errors.category)} errorText={errors.category} />
                    
                    <AddressFields values={values} handleChange={handleChange} errors={errors} />

                    <div className="buttons-container">
                        <button tabIndex={2} onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button tabIndex={1} type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}