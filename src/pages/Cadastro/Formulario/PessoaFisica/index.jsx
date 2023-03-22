import { object, string, number, date, InferType, setLocale } from 'yup';
import { Form, Formik } from 'formik';
import { useValidationErrors } from '../../../../hooks/useValidationsErrors';
import { InputField } from '../../../../components/InputField';
import { useCurrencyMask } from '../../../../hooks/useCurrencyMask';
import COLORS from '../../../../sass/_colors.scss'
import { useClient } from '../../../../hooks/useClient';

export const PessoaFisica = ({ previousStage, nextStage }) => {
    const default_errors = useValidationErrors()
    const currencyMask = useCurrencyMask()
    const client = useClient()

    const initial_inputs = client.value.form || {
        name: '',
        cpf: '',
        rg: '',
        email: '',
        phone: '',
        civil_status: '',
        nationality: '',
        profession: '',
        address: '',
        number: '',
        cep: '',
        bairro: '',
        monthly_spent: '',
    }

    const validationSchema = object({
        name: string().required(default_errors.required),
        cpf: string().length(14, default_errors.cpf).required(default_errors.required),
        rg: string().required(default_errors.required),
        email: string().email(default_errors.email).required(default_errors.required),
        phone: string().min(14, default_errors.phone).required(default_errors.required),
        civil_status: string().required(default_errors.required),
        nationality: string().required(default_errors.required),
        profession: string().required(default_errors.required),
        address: string().required(default_errors.required),
        number: number().typeError(default_errors.number).required(default_errors.required),
        cep: string().length(10, default_errors.cep).required(default_errors.required),
        bairro: string().required(default_errors.required),
        monthly_spent: string().required(default_errors.required),

        // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
        // email: string().email(default_errors.email),
        // website: string().url().nullable(),
        // createdOn: date().default(() => new Date()),
      });

    return (
        <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)} validationSchema={validationSchema} >
            {({handleChange, values, submitForm, errors}) => (
                <Form onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        submitForm();
                    }
                    }}>
                    <InputField title={'Nome Completo do  titular da Unidade Consumidora'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />
                    <InputField title={'CPF'} mask={[ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]} id={'cpf'} handleChange={handleChange} value={values.cpf} error={Boolean(errors.cpf)} errorText={errors.cpf} />
                    <InputField title={'RG'} id={'rg'} handleChange={handleChange} value={values.rg} error={Boolean(errors.rg)} errorText={errors.rg} />
                    <InputField title={'E-mail'} id={'email'} handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText={errors.email} />
                    <InputField title={'Telefone'} mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} id={'phone'} handleChange={handleChange} value={values.phone} error={Boolean(errors.phone)} errorText={errors.phone} />
                    <InputField title={'Estado Civil'} id={'civil_status'} handleChange={handleChange} value={values.civil_status} error={Boolean(errors.civil_status)} errorText={errors.civil_status} />
                    <InputField title={'Nacionalidade'} id={'nationality'} handleChange={handleChange} value={values.nationality} error={Boolean(errors.nationality)} errorText={errors.nationality} />
                    <InputField title={'Profissão'} id={'profession'} handleChange={handleChange} value={values.profession} error={Boolean(errors.profession)} errorText={errors.profession} />
                    <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                    <InputField title={'Número'} id={'number'} handleChange={handleChange} value={values.number} error={Boolean(errors.number)} errorText={errors.number} />
                    <InputField title={'CEP'} mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} id={'cep'} handleChange={handleChange} value={values.cep} error={Boolean(errors.cep)} errorText={errors.cep} />
                    <InputField title={'Bairro'} id={'bairro'} handleChange={handleChange} value={values.bairro} error={Boolean(errors.bairro)} errorText={errors.bairro} />
                    <InputField mask={currencyMask} title={'Gasto mensal em média'} id={'monthly_spent'} handleChange={handleChange} value={values.monthly_spent} error={Boolean(errors.monthly_spent)} errorText={errors.monthly_spent} />

                    <div className="buttons-container">
                        <button onClick={(event) => previousStage(event)} style={{backgroundColor: COLORS.gray}}>Voltar</button>
                        <button type="submit">Avançar</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}