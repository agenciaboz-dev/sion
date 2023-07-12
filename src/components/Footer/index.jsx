import './style.scss';
import {ReactComponent as Logo} from '../../images/logo.svg';
import {ReactComponent as InstagramIcon} from '../../images/instagram.svg';
import {ReactComponent as FacebookIcon} from '../../images/facebook.svg';
import {ReactComponent as ForwardArrow} from '../../images/forward_arrow_small.svg';
import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useCallback, useState } from 'react';
import { api } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import COLORS from '../../sass/_colors.scss'
import { useClient } from '../../hooks/useClient';

export const Footer = ({ vendas }) => {
    const menus = useHeaderMenus()
    const location = useLocation()
    const navigate = useNavigate()
    const client = useClient()

    const [email, setEmail] = useState("")

    const finish = () => {
        client.setValue(null)
        navigate("/")
    }

    return vendas ? (
        <div
            className="Footer-Component"
            style={{
                backgroundColor: "transparent",
                marginLeft: "-10vw",
                width: 0,
                height: 0,
                borderTop: "15vw solid transparent",
                borderBottom: "0 solid transparent",
                borderRight: `150vw solid ${COLORS.primary}`,
                padding: 0,
            }}
        >
            {location.pathname == "/cadastro/contrato" && (
                <div className="finish-container" onClick={finish}>
                    <p>Finalizar</p>
                    <div className="forward-arrow-container">
                        <ForwardArrow />
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="Footer-Component">
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
                    {menus.map((menu) => {
                        return (
                            <section key={menu.id}>
                                {location.pathname == "/" ? (
                                    <AnchorLink href={"#" + menu.name} className="menu-title">
                                        {menu.title}
                                    </AnchorLink>
                                ) : (
                                    <p onClick={() => navigate("/")} className="menu-title">
                                        {menu.title}
                                    </p>
                                )}
                            </section>
                        )
                    })}
                </div>
                <div className="news">
                    <p className="title">Receba notícias</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className="email-container">
                        <input type="email" placeholder="Seu e-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
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