import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/Contact/InputField';
import { useClient } from '../../../hooks/useClient';
import { object, string, number, date, InferType, setLocale } from 'yup';
import './style.scss';
import { useValidationErrors } from '../../../hooks/useValidationsErrors';


export const Formulario = ({ pessoa, setProgressBarStage, setPessoa }) => {

    const PessoaFisica = () => {

        const initial_inputs = {
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
            monthly_spent: number().typeError(default_errors.number).required(default_errors.required),

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
                        <div className="left-panel input-container">
                            <InputField title={'Nome Completo do  titular da Unidade Consumidora'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />
                            <InputField mask={'999.999.999-99'} title={'CPF'} id={'cpf'} handleChange={handleChange} value={values.cpf} error={Boolean(errors.cpf)} errorText={errors.cpf} />
                            <InputField title={'RG'} id={'rg'} handleChange={handleChange} value={values.rg} error={Boolean(errors.rg)} errorText={errors.rg} />
                            <InputField title={'E-mail'} id={'email'} handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText={errors.email} />
                            <InputField mask={'(99) 99999-9999'} title={'Telefone'} id={'phone'} handleChange={handleChange} value={values.phone} error={Boolean(errors.phone)} errorText={errors.phone} />
                            <button onClick={(event) => previousStage(event)}>Voltar</button>
                        </div>
                        <div className="right-panel input-container">
                            <InputField title={'Estado Civil'} id={'civil_status'} handleChange={handleChange} value={values.civil_status} error={Boolean(errors.civil_status)} errorText={errors.civil_status} />
                            <InputField title={'Nacionalidade'} id={'nationality'} handleChange={handleChange} value={values.nationality} error={Boolean(errors.nationality)} errorText={errors.nationality} />
                            <InputField title={'Profissão'} id={'profession'} handleChange={handleChange} value={values.profession} error={Boolean(errors.profession)} errorText={errors.profession} />
                            <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                            <InputField title={'Número'} id={'number'} handleChange={handleChange} value={values.number} error={Boolean(errors.number)} errorText={errors.number} />
                            <InputField mask={'99.999-999'} title={'CEP'} id={'cep'} handleChange={handleChange} value={values.cep} error={Boolean(errors.cep)} errorText={errors.cep} />
                            <InputField title={'Bairro'} id={'bairro'} handleChange={handleChange} value={values.bairro} error={Boolean(errors.bairro)} errorText={errors.bairro} />
                            <InputField title={'Gasto mensal em média'} id={'monthly_spent'} handleChange={handleChange} value={values.monthly_spent} error={Boolean(errors.monthly_spent)} errorText={errors.monthly_spent} />
                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    const PessoaJuridica = () => {

        const initial_inputs = {
            razao_social: '',
            name: '',
            cnpj: '',
            objeto_social: '',
            curriculo: '',
            email: '',
            phone: '',
            address: '',
            number: '',
            bairro: '',
            monthly_spent: '',
        }

        const validationSchema = object({
            razao_social: string().required(default_errors.required),
            name: string().required(default_errors.required),
            cnpj: string().required(default_errors.required),
            objeto_social: string().required(default_errors.required),
            curriculo: string().required(default_errors.required),
            email: string().email(default_errors.email).required(default_errors.required),
            phone: string().min(14, default_errors.phone).required(default_errors.required),
            address: string().required(default_errors.required),
            number: number().typeError(default_errors.number).required(default_errors.required),
            bairro: string().required(default_errors.required),
            monthly_spent: number().typeError(default_errors.number).required(default_errors.required),

            // age: number().typeError(default_errors.number).required(default_errors.required).positive().integer(),
            // email: string().email(default_errors.email),
            // website: string().url().nullable(),
            // createdOn: date().default(() => new Date()),
          });

        return (
            <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)} validationSchema={validationSchema}>
                {({handleChange, values, submitForm, errors}) => (
                    <Form onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault();
                            submitForm();
                        }
                        }}>
                        <div className="left-panel input-container">
                            <InputField title={'Razão Social titular da Unidade Consumidora'} id={'razao_social'} handleChange={handleChange} value={values.razao_social} error={Boolean(errors.razao_social)} errorText={errors.razao_social} />
                            <InputField title={'Nome do Responsável Legal'} id={'name'} handleChange={handleChange} value={values.name} error={Boolean(errors.name)} errorText={errors.name} />
                            <InputField mask={'99.999.999/9999-99'} title={'CNPJ'} id={'cnpj'} handleChange={handleChange} value={values.cnpj} error={Boolean(errors.cnpj)} errorText={errors.cnpj} />
                            <InputField title={'Objeto Social'} id={'objeto_social'} handleChange={handleChange} value={values.objeto_social} error={Boolean(errors.objeto_social)} errorText={errors.objeto_social} />
                            <InputField title={'Curriculo Social'} id={'curriculo'} handleChange={handleChange} value={values.curriculo} error={Boolean(errors.curriculo)} errorText={errors.curriculo} />
                            <button tabIndex={2} onClick={(event) => previousStage(event)}>Voltar</button>
                        </div>
                        <div className="right-panel input-container">
                            <InputField title={'E-mail dos Representantes legais para assinatura'} id={'email'} handleChange={handleChange} value={values.email} error={Boolean(errors.email)} errorText={errors.email} />
                            <InputField mask={'(99) 99999-9999'} title={'Telefone'} id={'phone'} handleChange={handleChange} value={values.phone} error={Boolean(errors.phone)} errorText={errors.phone} />
                            <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} error={Boolean(errors.address)} errorText={errors.address} />
                            <InputField title={'Número'} id={'number'} handleChange={handleChange} value={values.number} error={Boolean(errors.number)} errorText={errors.number} />
                            <InputField title={'Bairro'} id={'bairro'} handleChange={handleChange} value={values.bairro} error={Boolean(errors.bairro)} errorText={errors.bairro} />
                            <InputField title={'Gasto mensal em média'} id={'monthly_spent'} handleChange={handleChange} value={values.monthly_spent} error={Boolean(errors.monthly_spent)} errorText={errors.monthly_spent} />
                            <button tabIndex={1} type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    const navigate = useNavigate()
    const client = useClient()
    const default_errors = useValidationErrors()

    const nextStage = (values) => {
        client.setValue({...client.value, form: values})
        navigate('/cadastro/fatura')
    }

    const previousStage = (event) => {
        event.preventDefault()
        window.scrollTo(0, 200);
        setPessoa(null)
        navigate('/cadastro')
    }
    
    useEffect(() => {
        setProgressBarStage(34)
    }, [])

    return (
        <div className='Formulario-Component' >
            { pessoa == 'fisica' 
            ? 
            <PessoaFisica /> 
            : 
            <PessoaJuridica /> }
        </div>
    )
}