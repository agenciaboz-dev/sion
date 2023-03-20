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
import { StickyHomeButton } from '../../components/StickyHomeButton';
import { ScrollTop } from '../../components/ScrollTop';
import { WhatsappButton } from '../../components/WhatsappButton';

const Home = () => {

    const [stickyHeader, setstickyHeader] = useState(false)
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
            <ScrollTop />
            <LoadingScreen loading={loading}/>
            <Header alternative={stickyHeader} setAlternative={setstickyHeader} />
            <div className="main-container" ref={main_container_ref}>
                <Advert innerRef={advert_ref} />
                <HowWorks main_container_height={main_container_dimensions.height} advert_height={advert_dimensions.height} />
                <Simulator />
                <WhoGets />
                <Faq />
                {/* <button onClick={() => navigate('/cadastro')}>Quero economizar!</button> */}
                <Contact />
                <About />
            </div>
            <div className="buttons-container">
                <StickyHomeButton show={stickyHeader} />
                <WhatsappButton />
            </div>
            <Footer />
        </section>
    )
}

export default Home