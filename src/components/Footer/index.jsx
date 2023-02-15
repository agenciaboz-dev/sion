import './style.scss';
import {ReactComponent as Logo} from '../../images/logo.svg';
import {ReactComponent as InstagramIcon} from '../../images/instagram.svg';
import {ReactComponent as FacebookIcon} from '../../images/facebook.svg';
import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export const Footer = () => {

    const menus = useHeaderMenus()
    
    return (
        <div className='Footer-Component' >
            <div className="top-content">
                <div className="info">
                    <Logo />
                    <div className="address">
                        <p>Rua Dr. Manoel Pedro, 365,</p>
                        <p>21º andar. Curitiba - PR</p>
                    </div>
                    <div className="contact">
                        <p>(41) 3533-5910</p>
                        <p>comercial@sionenergia.com.br</p>
                    </div>
                </div>
                <div className="links">
                    {menus.map(menu => {
                        return (
                            <section key={menu.id}>
                                <AnchorLink href={'#'+menu.name}className='menu-title'>{menu.title}</AnchorLink>
                            </section>
                        )
                    })}
                </div>
                <div className="news">
                    <p className="title">Receba notícias</p>
                    <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="email-container">
                        <input type="email" placeholder='Seu e-mail' />
                        <button><span style={{whiteSpace: 'nowrap'}}>Inscrever-se</span></button>
                    </div>
                </div>
            </div>

            <div className="bottom-content">
                <p>2023 © Direitos Reservados | Powered By BOZ</p>
                <div className="icons">
                    <InstagramIcon />
                    <FacebookIcon />
                </div>
            </div>
            
        </div>
    )
}