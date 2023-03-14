import { Form, Formik } from 'formik';
import { Footer } from '../../components/Footer';
import { InputField } from '../../components/InputField';
import { ReactComponent as LogoIcon } from '../../images/login/logo.svg'
import './style.scss';

export const Login = () => {
    
    return (
        <div className='Login-Page' >
            <div className="main-container">
                <LogoIcon />
                <Formik initialValues={{user: '', password: ''}}>
                    {({handleChange, values, submitForm, errors}) => (
                        <Form>
                            <InputField title={'Nome de usuário ou e-mail'} id={'user'} handleChange={handleChange} value={values.user} error={Boolean(errors.user)} errorText={errors.user} />
                            <InputField title={'Senha'} id={'password'} handleChange={handleChange} value={values.password} error={Boolean(errors.password)} errorText={errors.password} />
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    )
}