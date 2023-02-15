import AnchorLink from 'react-anchor-link-smooth-scroll';
import './style.scss';

export const Advert = ({ innerRef }) => {
    
    return (
        <div className='Advert-Component' ref={innerRef}>
            <h1>Até 15%</h1>
            <h2>de economia na sua conta de luz!</h2>
            <p>Sem Investimento Sem instalação Adesão 100% online Uso de Energia</p>
            <p>Renovável</p>
            <div className="buttons">
                <button>Quero economizar!</button>
                <AnchorLink href={'#how'}className='menu-title'>Saiba como funciona</AnchorLink>
            </div>
        </div>
    )
}