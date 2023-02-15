import { useRef, useState } from 'react';
import { LoadingScreen } from '../../components/LoadingScreen';
import { api } from '../../api'
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Advert } from '../../components/Advert';
import { HowWorks } from '../../components/HowWorks';
import { Simulator } from '../../components/Simulator';
import { Background } from '../../components/Background';
import { WhoGets } from '../../components/WhoGets';
import { About } from '../../components/About';
import { Faq } from '../../components/Faq';

const Home = () => {

    const mainContainerRef = useRef(null)

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
            <Background />
            <LoadingScreen loading={loading}/>
            <Header />
            <div className="main-container" ref={mainContainerRef}>
                <Advert />
                <HowWorks mainContainerRef={mainContainerRef} />
                <Simulator />
                <WhoGets />
                <About />
                <Faq />
            </div>
        </section>
    )
}

export default Home