import { Checkbox, FormControlLabel } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import { MuiLoading } from '../../components/MuiLoading';
import { Header } from '../../components/Header';

export const Login = () => {

    const storage = useLocalStorage()
    const [user, setUser] = useUser()
    const navigate = useNavigate()

    const [remind, setRemind] = useState(storage.get('remindme'))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const tryLogin = (values) => {
        setLoading(true)
        setError(false)

        api.post('/login', values)
        .then(response => {
            if (response.data.error) {
                setError(true)
            } else {
                const usuario = response.data
                storage.set('user_sion', remind ? usuario : null)
                setUser(usuario)

                navigate('/cadastro')
            }
        })
        .catch(error => console.error(error))
        .finally(() => {
            setLoading(false)
        })

    }

    useEffect(() => {
        storage.set('remindme', remind)
    }, [remind])

    useEffect(() => {
        if (user?.username) navigate('/cadastro')
    }, [])
    
    return (
        <div className='Login-Page' >
            <Header vendas />
            <div className="main-container">
                <LogoIcon />
                <Formik initialValues={{user: '', password: ''}} onSubmit={values => tryLogin(values)}>
                    {({handleChange, values, submitForm, errors}) => (
                        <Form>
                            <InputField title={'Nome de usuário ou e-mail'} id={'user'} handleChange={handleChange} value={values.user} error={Boolean(errors.user)} errorText={errors.user} />
                            <InputField title={'Senha'} type='password' id={'password'} handleChange={handleChange} value={values.password} error={error} errorText={'Não foi possível fazer login'} />
                            <div className="bottom-container">
                                <div className='remember-wrapper'>
                                    <div className='remember-container'>
                                        <FormControlLabel control={<Checkbox checked={remind} onChange={() => setRemind(!remind)} />} label={'Lembre de mim'} />
                                    </div>
                                    <p>Perdeu a senha?</p>
                                </div>
                                <div className='button-container'>
                                    <button type='submit'>{loading ? <MuiLoading /> : 'Entrar'}</button>
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