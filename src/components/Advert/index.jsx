import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import {ReactComponent as LogoBranco} from '../../images/logo_branco.svg';

export const Advert = ({ innerRef }) => {
    const navigate = useNavigate()
    const goToSignUp = () => {
        window.scrollTo(0, 200);
        navigate('/cadastro')
    }
    
    return (
        <div className='Advert-Component' ref={innerRef}>
            <div className="left">
                <LogoBranco className='logo'/>
                <h1>Até 15%</h1>
                <h3>de economia na sua conta de luz!</h3>
                <p>Sem Investimento<br />Sem instalação<br />Adesão 100% online<br />Uso de Energia Renovável</p>
                <div className="advert-buttons-container">
                    <button onClick={() => goToSignUp()}>Quero economizar!</button>
                    <a href={'#how'}className='menu-title'>Saiba como funciona</a>
                </div>
            </div>
            <div className="right">
                <div className="images-container">
                    <div className="large-image-container">
                        <img src="/images/img1.webp" alt="" />
                    </div>
                    <div className="small-images-container">
                        <img src="/images/loja-juveve.webp" alt="" />
                        <img src="/images/pexels-photo-2309235.webp" alt="" />
                        <img src="/images/photo-1528698827591-e19ccd7bc23d.webp" alt="" />
                    </div>
                </div>
                <p>Oferecemos para sua empresa a energia mais barata que é gerada pelas nossas usinas</p>
            </div>
        </div>
    )
}