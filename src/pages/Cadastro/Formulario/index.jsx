import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/Contact/InputField';
import { useClient } from '../../../hooks/useClient';
import './style.scss';

export const Formulario = ({ pessoa, setProgressBarStage, setPessoa }) => {
    const navigate = useNavigate()
    const client = useClient()

    const inputs = pessoa == 'juridica' ? [
        { title: 'Razão Social titular da Unidade Consumidora', id: 'razao_social' },
        { title: 'Nome do Responsável Legal', id: 'name' },
        { title: 'CNPJ', id: 'cnpj' },
        { title: 'Objeto Social', id: 'objeto_social' },
        { title: 'Currículo Social', id: 'curriculo' },
        { title: 'E-mail dos Representantes legais para assinatura', id: 'email' },
        { title: 'Telefone', id: 'phone' },
        { title: 'Endereço', id: 'address' },
        { title: 'Número', id: 'number' },
        { title: 'Bairro', id: 'bairro' },
        { title: 'Gasto mensal em média', id: 'monthly_spent' },
    ] : [
        { title: 'Nome Completo do  titular da Unidade Consumidora', id: 'name' },
        { title: 'CPF', id: 'cpf' },
        { title: 'RG', id: 'rg' },
        { title: 'E-mail', id: 'email' },
        { title: 'Telefone', id: 'phone' },
        { title: 'Estado Civil', id: 'civil_status' },
        { title: 'Nacionalidade', id: 'nationality' },
        { title: 'Profession', id: 'profession' },
        { title: 'Endereço', id: 'address' },
        { title: 'Número', id: 'number' },
        { title: 'CEP', id: 'cep' },
        { title: 'Bairro', id: 'bairro' },
        { title: 'Gasto mensal em média', id: 'monthly_spent' },
    ]

    const initial_inputs = inputs.reduce((acc, input) => {
        return { ...acc, [input.id]: "" };
      }, {});

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
            <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)}>
                {({handleChange}) => (
                    <Form>
                        <div className="left-panel input-container">
                            {inputs.slice(0, 5).map(input => {
                                return (
                                    <InputField key={input.id} title={input.title} id={input.id} handleChange={handleChange} />
                                )
                            })}
                            <button onClick={(event) => previousStage(event)}>Voltar</button>
                        </div>
                        <div className="right-panel input-container">
                            {inputs.slice(5).map(input => {
                                return (
                                    <InputField key={input.id} title={input.title} id={input.id} handleChange={handleChange} />
                                )
                            })}
                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}