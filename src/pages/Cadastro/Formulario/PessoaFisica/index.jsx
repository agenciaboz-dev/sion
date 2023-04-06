import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../components/InputField';
import { useCurrencyMask } from '../../../../hooks/useCurrencyMask';
import COLORS from '../../../../sass/_colors.scss'
import { useClient } from '../../../../hooks/useClient';
import { useRef } from 'react';
import { useValidateCPF } from '../../../../hooks/useValidateCPF';
import { useState } from 'react';

export const PessoaFisica = ({ previousStage, nextStage }) => {
    const default_errors = useValidationErrors()
    const currencyMask = useCurrencyMask()
    const client = useClient()
    const cpfRef = useRef(null)
    const validateCPF = useValidateCPF()

    const [cpfError, setCpfError] = useState(false)

    const initial_inputs = client.value?.form || {
        name: '',
        cpf: '',
        rg: '',
        birth: new Date().toISOString().substring(0, 10),
        email: '',
        phone: '',
        address: '',
        cep: '',
    }

    const validationSchema = object({
        name: string().required(default_errors.required),
        cpf: string().length(14, default_errors.cpf).required(default_errors.required),
        rg: string().required(default_errors.required),
        email: string().email(default_errors.email).required(default_errors.required),
        phone: string().min(14, default_errors.phone).required(default_errors.required),
        address: string().required(default_errors.required),
        cep: string().length(10, default_errors.cep).required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
    })

    const cpfBlur = event => {
        setCpfError(!validateCPF(event.target.value))
    }

    return (
        <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values, cpfError)} validationSchema={validationSchema} >
            {({handleChange, values, submitForm, errors}) => (
                <Form onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        submitForm();
                    }
                    }}>
                    <InputField title={'Nome Completo do titular da Unidade Consumidora'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />
                    <InputField title={'CPF'} onBlur={cpfBlur} mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]} inputMode={'numeric'} id={'cpf'} handleChange={handleChange} value={values.cpf} error={cpfError} errorText={'CPF inválido'} />
                    <InputField title={'RG'} inputMode={'numeric'} id={'rg'} handleChange={handleChange} value={values.rg} error={Boolean(errors.rg)} errorText={errors.rg} />
                    <InputField title={'Data de nascimento'} type='date' id={'birth'} handleChange={handleChange} value={values.birth} error={errors.birth} errorText={'Data inválida'} />
                    <InputField title={'E-mail'} inputMode={'email'} id={'email'} handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText={errors.email} />
                    <InputField title={'Telefone'} inputMode={'tel'} mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} id={'phone'} handleChange={handleChange} value={values.phone} error={Boolean(errors.phone)} errorText={errors.phone} />
                    <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                    <InputField title={'CEP'} inputMode={'numeric'} mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id={'cep'} handleChange={handleChange} value={values.cep} error={Boolean(errors.cep)} errorText={errors.cep} />

                    <div className="buttons-container">
                        <button onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}