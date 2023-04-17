import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useLayoutEffect, useState } from 'react';
import { api } from '../../api';
import { Footer } from '../../components/Footer';
import { InputField } from '../../components/InputField';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ReactComponent as LogoEscuro } from '../../images/logo_bonita.svg'
import './style.scss';
import { useUser } from '../../hooks/useUser';
import { useNavigate, useParams } from 'react-router-dom';
import { MuiLoading } from '../../components/MuiLoading';
import { Header } from '../../components/Header';
import { ReactComponent as UpArrowIcon } from '../../images/login/up_arrow.svg'

export const Login = () => {

    const storage = useLocalStorage()
    const [user, setUser] = useUser()
    const navigate = useNavigate()
    const params = useParams()

    const [remind, setRemind] = useState(storage.get('remindme'))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [login, setLogin] = useState(true)
    const [clientName, setClientName] = useState('')

    const tryLogin = (values) => {
        setLoading(true)
        setError(false)

        api.post('/login', values)
        .then(response => {
            if (response.data) {
                const usuario = response.data
                storage.set('user_sion', remind ? usuario : null)
                setUser(usuario)

                navigate(params.id ? '/sign/'+params.id : '/cadastro')
            } else {
                setError(true)
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
        if (params.id) {
            if (user?.username) navigate('/sign/'+params.id)
        } else {
            if (user?.username) navigate('/cadastro')
        }

        api.post('/contract', { id: params.id })
        .then(response => setClientName('Assinar como '+response.data.name))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
        
    }, [])

    useLayoutEffect(() => {
        params.id && setLogin(false)
    }, [])
    
    return (
        <div className='Login-Page' >
            <Header vendas />
            <div className="main-container" style={{marginTop: !login && 'auto'}}>
                <LogoEscuro />
                <Formik initialValues={{user: '', password: ''}} onSubmit={values => tryLogin(values)}>
                    {({handleChange, values, submitForm, errors}) => (
                        <Form>
                             
                             { params.id &&
                             <>
                                <div className="client-button">
                                        <Button variant='contained' fullWidth onClick={() => navigate('/sign/'+params.id)} >{clientName || <MuiLoading size={'1.5rem'} />}</Button>
                                    { login && 
                                    <div className='or'>
                                        <div>
                                            <hr />
                                        </div>
                                        <p>OU</p>
                                        <div>
                                            <hr />
                                        </div>
                                    </div>
                                    }

                                   
                                </div>
                                <UpArrowIcon onClick={() => setLogin(!login)} className='up-arrow' style={{transform: login && 'rotate(180deg)'}} />
                            </>
                            }
                            { login &&
                                <>
                                    <div className="user-input-container">
                                        <label>Nome de usuário ou e-mail</label>
                                        <InputField title={''} id={'user'} handleChange={handleChange} value={values.user} error={Boolean(errors.user)} errorText={errors.user} />
                                    </div>
                                    <div className="password-input-container">
                                        <label>Senha</label>
                                        <InputField title={''} type='password' id={'password'} handleChange={handleChange} value={values.password} error={error} errorText={'Não foi possível fazer login'} />
                                    </div>
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
                                </>
                            }
                            
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer vendas />
        </div>
    )
}