import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useNavigate } from 'react-router-dom';
import './style.scss';

export const Advert = ({ innerRef }) => {
    const navigate = useNavigate()
    
    return (
        <div className='Advert-Component' ref={innerRef}>
            <h1 className='shadow-text'>Até 15%</h1>
            <h3 className='shadow-text'>de economia na sua conta de luz!</h3>
            <h2 className='shadow-text'>Aumente sua rentabilidade com nossa <span>energia renovável</span> e<br />de <span>menor custo</span> para sua empresa</h2>
            <p className='shadow-text'>Sem Investimento Sem instalação Adesão 100% online Uso de Energia Renovável</p>
            <div className="buttons">
                <button onClick={() => navigate('/cadastro')}>Quero economizar!</button>
                <AnchorLink href={'#how'}className='menu-title'>Saiba como funciona</AnchorLink>
            </div>
        </div>
    )
}