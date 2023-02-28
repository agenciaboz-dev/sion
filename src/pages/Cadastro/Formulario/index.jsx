import { Form, Formik } from 'formik';
import { InputField } from '../../../components/Contact/InputField';
import './style.scss';

export const Formulario = () => {

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
    
    return (
        <div className='Formulario-Component' >
            <Formik initialValues={initial_inputs} onSubmit={values => nextStage(values)}>
                {({handleChange}) => (
                    <Form>
                        <div className="left-panel input-container">
                            <InputField title={'Razão Social titular da Unidade Consumidora *'} id='razao_social' handleChange={handleChange} />
                            <InputField title={'Nome do Responsável Legal *'} id='name' handleChange={handleChange} />
                            <InputField title={'CNPJ'} id='cnpj' handleChange={handleChange} />
                            <InputField title={'Objeto Social'} id='objeto_social' handleChange={handleChange} />
                            <InputField title={'Currículo Social'} id='curriculo' handleChange={handleChange} />
                            <button>Voltar</button>
                        </div>
                        <div className="right-panel input-container">

                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}