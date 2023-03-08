import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/Contact/InputField';
import { useClient } from '../../../hooks/useClient';
import './style.scss';


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

        return (
            <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)}>
                {({handleChange, values}) => (
                    <Form>
                        <div className="left-panel input-container">
                            <InputField title={'Nome Completo do  titular da Unidade Consumidora'} id={'name'} handleChange={handleChange} value={values.name} />
                            <InputField title={'CPF'} id={'cpf'} handleChange={handleChange} value={values.cpf} />
                            <InputField title={'RG'} id={'rg'} handleChange={handleChange} value={values.rg} />
                            <InputField title={'E-mail'} id={'email'} handleChange={handleChange} value={values.email} />
                            <InputField title={'Telefone'} id={'phone'} handleChange={handleChange} value={values.phone} />
                            <button onClick={(event) => previousStage(event)}>Voltar</button>
                        </div>
                        <div className="right-panel input-container">
                            <InputField title={'Estado Civil'} id={'civil_status'} handleChange={handleChange} value={values.civil_status} />
                            <InputField title={'Nacionalidade'} id={'nationality'} handleChange={handleChange} value={values.nationality} />
                            <InputField title={'Profissão'} id={'profession'} handleChange={handleChange} value={values.profession} />
                            <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} />
                            <InputField title={'Número'} id={'number'} handleChange={handleChange} value={values.number} />
                            <InputField title={'CEP'} id={'cep'} handleChange={handleChange} value={values.cep} />
                            <InputField title={'Bairro'} id={'bairro'} handleChange={handleChange} value={values.bairro} />
                            <InputField title={'Gasto mensal em média'} id={'monthly_spent'} handleChange={handleChange} value={values.monthly_spent} />
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

        return (
            <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)}>
                {({handleChange, values}) => (
                    <Form>
                        <div className="left-panel input-container">
                            <InputField title={'Razão Social titular da Unidade Consumidora'} id={'razao_social'} handleChange={handleChange} value={values.razao_social} />
                            <InputField title={'Nome do Responsável Legal'} id={'name'} handleChange={handleChange} value={values.name} />
                            <InputField title={'CNPJ'} id={'cnpj'} handleChange={handleChange} value={values.cnpj} />
                            <InputField title={'Objeto Social'} id={'objeto_social'} handleChange={handleChange} value={values.objeto_social} />
                            <InputField title={'Curriculo Social'} id={'curriculo'} handleChange={handleChange} value={values.curriculo} />
                            <button onClick={(event) => previousStage(event)}>Voltar</button>
                        </div>
                        <div className="right-panel input-container">
                            <InputField title={'E-mail dos Representantes legais para assinatura'} id={'email'} handleChange={handleChange} value={values.email} />
                            <InputField title={'Telefone'} id={'phone'} handleChange={handleChange} value={values.phone} />
                            <InputField title={'Endereço'} id={'address'} handleChange={handleChange} value={values.address} />
                            <InputField title={'Número'} id={'number'} handleChange={handleChange} value={values.number} />
                            <InputField title={'Bairro'} id={'bairro'} handleChange={handleChange} value={values.bairro} />
                            <InputField title={'Gasto mensal em média'} id={'monthly_spent'} handleChange={handleChange} value={values.monthly_spent} />
                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    const navigate = useNavigate()
    const client = useClient()

    const nextStage = (values) => {
        alert(JSON.stringify(values))
        client.setValue({...client.value, form: values})
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