import './style.scss';
import {ReactComponent as LogoBranco} from '../../images/logo_branco.svg';
import {ReactComponent as InstagramIcon} from '../../images/instagram.svg';
import {ReactComponent as FacebookIcon} from '../../images/facebook.svg';
import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useCallback, useState } from 'react';
import { api } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';

export const Footer = () => {

    const menus = useHeaderMenus()
    const location = useLocation()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const onMailSignUp = useCallback(() => {
        api.post('/signup', {email, news_signup: true})
        .then(response => {
            console.log(response.data)

            if (response.data.insertId) {
                alert('e-mail cadastrado')
            } else {
                alert('erro desconhecido')
            }
        })
    }, [email])
    
    return (
        <div className='Footer-Component' >
            <div className="top-content">
                <div className="info">
                    <LogoBranco />
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
                                { location.pathname == '/' ?
                                    <AnchorLink href={'#'+menu.name} className='menu-title' >{menu.title}</AnchorLink>
                                    :
                                    <p onClick={() => navigate('/')} className='menu-title' >{menu.title}</p>
                                }
                            </section>
                        )
                    })}
                </div>
                <div className="news">
                    <p className="title">Receba notícias</p>
                    <p>Receba as últimas notícias e informações relevantes diretamente em sua caixa de entrada, não perca a oportunidade de ficar informado e se beneficiar das vantagens que oferecemos.</p>
                    <div className="email-container">
                        <input type="email" placeholder='Seu e-mail' value={email} onChange={event => setEmail(event.target.value)}/>
                        <button onClick={onMailSignUp}><span style={{whiteSpace: 'nowrap'}}>Inscrever-se</span></button>
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