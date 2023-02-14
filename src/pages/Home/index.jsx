import { useState } from 'react';
import { Input } from 'react-burgos';
import { Form } from 'react-burgos';
import { LoadingScreen } from '../../components/LoadingScreen';
import { api } from '../../api'
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
// import { Membro } from '../../contexts/Membro';

const Home = () => {

    const navigate = useNavigate();
    // const [loginfeedback, setLoginfeedback] = useState('');
    const onFormSubmit = (values) => {
        const data = {
            login: values.input_login,
            password: values.input_senha,
        }
        console.log(data);
        setLoading(true);
        api.post('/login', data)
        .then((response) => {
            console.log(response.data);
            if (!!response.data[0]) {
                navigate('/perfil', {state: response.data[0]});
            }
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const inputs = {
        input_login: '',
        input_senha: '',
    }

    const [loading, setLoading] = useState(false)

    return (
        <section className="home-page">
            <LoadingScreen loading={loading}/>
            <Header />
            <div className="main-container">
                <h1>sion</h1>
            </div>
        </section>
    )
}

export default Home