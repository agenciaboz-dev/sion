import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import {ReactComponent as Square_Arrow} from '../../images/square_arrow_icon.svg';

export const Advert = ({ innerRef }) => {
    const navigate = useNavigate()
    const goToSignUp = () => {
        window.scrollTo(0, 200);
        navigate('/cadastro')
    }
    
    return (
        <div className='Advert-Component' ref={innerRef}>
            <div className="white-box">
                <h2>Aumente sua rentabilidade com nossa <span>energia renovável</span> e de menor custo para sua empresa</h2>
                <p>Sem Investimento Sem instalação Adesão 100% online Uso de Energia Renovável</p>
                <a href={'#how'}className='menu-title'>Saiba como funciona <Square_Arrow className='square-arrow'/> </a>
            </div>
            <div className="blue-box">
                <h1>Até 15%</h1>
                <h3>de economia na sua conta de luz!</h3>
                <button onClick={() => goToSignUp()}>Quero economizar!</button>
            </div>
        </div>
    )
}