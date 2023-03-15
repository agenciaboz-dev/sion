import { Checkbox } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { api } from '../../api';
import { Footer } from '../../components/Footer';
import { InputField } from '../../components/InputField';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ReactComponent as LogoIcon } from '../../images/login/logotype.svg'
import CircularProgress from '@mui/material/CircularProgress';
import './style.scss';
import { useUser } from '../../hooks/useUser';

export const Login = () => {

    const storage = useLocalStorage()
    const [user, setUser] = useUser()

    const [remind, setRemind] = useState(storage.get('remindme'))
    const [loading, setLoading] = useState(false)

    const tryLogin = (values) => {
        setLoading(true)

        api.post('/login', values)
        .then(response => {
            storage.set('user', remind ? response.data : null)

            setUser(response.data)
        })
        .catch(error => console.error(error))
        .finally(() => {
            setLoading(false)
        })

    }

    useEffect(() => {
        storage.set('remindme', remind)
    }, [remind])
    
    return (
        <div className='Login-Page' >
            <div className="main-container">
                <LogoIcon />
                <Formik initialValues={{user: '', password: ''}} onSubmit={values => tryLogin(values)}>
                    {({handleChange, values, submitForm, errors}) => (
                        <Form>
                            <InputField title={'Nome de usuário ou e-mail'} id={'user'} handleChange={handleChange} value={values.user} error={Boolean(errors.user)} errorText={errors.user} />
                            <InputField title={'Senha'} type='password' id={'password'} handleChange={handleChange} value={values.password} error={Boolean(errors.password)} errorText={errors.password} />
                            <div className="bottom-container">
                                <div>
                                    <div className='remember-container'>
                                        <Checkbox id='remindme' checked={remind} onChange={() => setRemind(!remind)} />
                                        <label htmlFor='remindme'>Lembre de mim</label>
                                    </div>
                                    <p>Perdeu a senha?</p>
                                </div>
                                <div className='button-container'>
                                    <button type='submit'>{loading ? <CircularProgress /> : 'Entrar'}</button>
                                    <p>Quero economizar!</p>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </div>
    )
}