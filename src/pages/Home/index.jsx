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
import useMeasure from 'react-use-measure';
import { Footer } from '../../components/Footer';
import { Contact } from '../../components/Contact';

const Home = () => {

    const [main_container_ref, main_container_dimensions] = useMeasure()
    const [advert_ref, advert_dimensions] = useMeasure()

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
        <section className="home-page" id='home'>
            <Background />
            <LoadingScreen loading={loading}/>
            <Header />
            <div className="main-container" ref={main_container_ref}>
                <Advert innerRef={advert_ref} />
                <HowWorks main_container_height={main_container_dimensions.height} advert_height={advert_dimensions.height} />
                <Simulator />
                <WhoGets />
                <Faq />
                <About />
                <Contact />
            </div>
            <Footer />
        </section>
    )
}

export default Home