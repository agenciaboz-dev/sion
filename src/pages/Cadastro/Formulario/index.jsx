import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../components/Contact/InputField';
import './style.scss';

export const Formulario = () => {

    const navigate = useNavigate()

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
        cep: '',
        bairro: ''
    }

    const nextStage = (values) => {
        alert(JSON.stringify(values))
    }

    const previousStage = () => {
        navigate('/cadastro')
    }
    
    return (
        <div className='Formulario-Component' >
            <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)}>
                {({handleChange}) => (
                    <Form>
                        <div className="left-panel input-container">
                            <InputField title={'Razão Social titular da Unidade Consumidora'} id='razao_social' handleChange={handleChange} />
                            <InputField title={'Nome do Responsável Legal'} id='name' handleChange={handleChange} />
                            <InputField title={'CNPJ'} id='cnpj' handleChange={handleChange} />
                            <InputField title={'Objeto Social'} id='objeto_social' handleChange={handleChange} />
                            <InputField title={'Currículo Social'} id='curriculo' handleChange={handleChange} />
                            <button onClick={() => previousStage()}>Voltar</button>
                        </div>
                        <div className="right-panel input-container">
                            <InputField title={'E-mail dos Representantes legais para assinatura'} id='email' handleChange={handleChange} />
                            <InputField title={'Telefone'} id='phone' handleChange={handleChange} />
                            <div>
                                <InputField title={'Endereço'} id='address' handleChange={handleChange} />
                                <InputField title={'Número'} id='number' handleChange={handleChange} />
                            </div>
                            <div>
                                <InputField title={'CEP'} id='cep' handleChange={handleChange} />
                                <InputField title={'Bairro'} id='bairro' handleChange={handleChange} />
                            </div>
                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}