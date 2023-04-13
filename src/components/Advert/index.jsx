import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import {ReactComponent as Checkmark} from '../../images/checkmark.svg';
import {ReactComponent as Arrow} from '../../images/thin_arrow_right.svg';

export const Advert = ({ innerRef }) => {
    const navigate = useNavigate()
    const goToSignUp = () => {
        window.scrollTo(0, 200);
        navigate('/cadastro')
    }
    
    return (
        <div className='Advert-Component' ref={innerRef}>
            <div className="left">
                <h1>Até 15%</h1>
                <h3>de economia na sua conta de luz!</h3>
                {/* <p>Sem Investimento<br />Sem instalação<br />Adesão 100% online<br />Uso de Energia Renovável</p> */}
                <p>Geramos energia mais barata para seu negócio!</p>
                {/* <div className="advert-buttons-container">
                    <button onClick={() => goToSignUp()}>Quero economizar!</button>
                    <a href={'#how'}className='menu-title'>Saiba como funciona</a>
                </div> */}
            </div>
            <div className="right">
                <div className="blue-box">
                    <p className='be-part'>Faça parte da Sion Cooperativa</p>
                    <div className="blue-box-ad">
                        <Checkmark />
                        <p className='blue-box-ad-p'>Economia na sua energia</p>
                    </div>
                    <div className="blue-box-ad">
                        <Checkmark />
                        <p className='blue-box-ad-p'>Sem investimento ou instalação</p>
                    </div>
                    <div className="blue-box-ad">
                        <Checkmark />
                        <p className='blue-box-ad-p'>Adesão 100% online</p>
                    </div>
                    <div className="blue-box-ad">
                        <Checkmark />
                        <p className='blue-box-ad-p'>Uso de Energia Renovável</p>
                    </div>
                    <button className='blue-box-register-button'>Cadastre-se! <Arrow /></button>
                </div>
            </div>
        </div>
    )
}