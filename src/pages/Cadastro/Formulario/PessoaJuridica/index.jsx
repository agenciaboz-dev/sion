import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../components/InputField';
import COLORS from '../../../../sass/_colors.scss'
import { useClient } from '../../../../hooks/useClient';
import { useState } from 'react';
import { useValidateCNPJ } from '../../../../hooks/useValidateCNPJ';

export const PessoaJuridica = ({ previousStage, nextStage }) => {
    const default_errors = useValidationErrors()
    const client = useClient()
    const validateCNPJ = useValidateCNPJ()
    
    const [cnpjError, setCnpjError] = useState(false)

    const initial_inputs = client.value?.form ||  {
        company: '',
        cnpj: '',
        category: '',
        address: '',
        cep: '',
    }

    const validationSchema = object({
        company: string().required(default_errors.required),
        cnpj: string().length(18, default_errors.cnpj).required(default_errors.required),
        category: string().required(default_errors.required),
        address: string().required(default_errors.required),
        cep: string().length(10, default_errors.cep).required(default_errors.required),

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
        <Formik initialValues={initial_inputs} onSubmit={nextStage} validationSchema={validationSchema}>
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
                    <InputField title={'Endereço da unidade consumidora'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                    <InputField title={'CEP'} inputMode={'numeric'} mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id={'cep'} handleChange={handleChange} value={values.cep} error={Boolean(errors.cep)} errorText={errors.cep} />

                    <div className="buttons-container">
                        <button tabIndex={2} onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button tabIndex={1} type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}