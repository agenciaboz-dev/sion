import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import {ReactComponent as LogoBranco} from '../../images/logo_branco.svg';
import './style.scss';
import COLORS from '../../sass/_colors.scss'
import { HeaderButton } from './HeaderButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Menu, MenuItem } from '@mui/material';
import { ReactComponent as MenuButton } from '../../images/menu_button.svg'

export const Header = ({ alternative, setAlternative }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = (test) => {
        setAnchorEl(null);
        console.log(test)
      };

    const menus = useHeaderMenus()
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMediaQuery({maxWidth: 600})

    const alternative_style = {
        backgroundColor: COLORS.primary,
        position: 'fixed',
        top: 0,
        width: '100%',
    }

    useEffect(() => {
        const onScroll = () => {
            setAlternative(window.scrollY > 50 ? true : false)
        }

        window.addEventListener('scroll', onScroll, { passive: true });


        const script = document.createElement('script');
      
        script.innerHTML = `
        (function (d, s, u) {
          let h = d.getElementsByTagName(s)[0], k = d.createElement(s);
          k.onload = function () {
            let l = d.createElement(s); l.src = u; l.async = true;
            h.parentNode.insertBefore(l, k.nextSibling);
          };
          k.async = true; k.src = 'https://storage.googleapis.com/push-webchat/wwc-latest.js';
          h.parentNode.insertBefore(k, h);
        })(document, 'script', 'https://weni-sp-integrations-production.s3.amazonaws.com/apptypes/wwc/7a3f1cad-3671-45a4-a1ea-9d33ac1883e2/script.js');
      `
        script.async = true;
      
        document.body.appendChild(script);

        return () => {
            window.removeEventListener('scroll', onScroll)
            document.body.removeChild(script);
        };
    }, [])
    
    return (
      <div className="Header-Component">
        {isMobile ? (
          <div className="mobile-header">
            <MenuButton className="menu-button" onClick={handleClick} />
            <Menu id="basic-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
              <MenuItem onClick={() => handleClose()}>
                <AnchorLink href={"#home"} className="menu-title">
                  Home
                </AnchorLink>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <AnchorLink href={"#how"} className="menu-title">
                  Como funciona
                </AnchorLink>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <AnchorLink href={"#simulator"} className="menu-title">
                  Simulador
                </AnchorLink>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <AnchorLink href={"#faq"} className="menu-title">
                  FAQ
                </AnchorLink>
              </MenuItem>
              <MenuItem onClick={() => handleClose()}>
                <AnchorLink href={"#about"} className="menu-title">
                  Quem somos
                </AnchorLink>
              </MenuItem>
              <MenuItem className="mobile-client-button" onClick={() => navigate("/")}>
                Sou cliente
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className="menus-container" style={alternative ? alternative_style : null}>
            {/* {alternative ? <LogoBranco /> : null} */}
            <LogoBranco />
            {menus.map((menu) => {
              return (
                <section key={menu.id}>
                  <HeaderButton menu={menu} alternative={alternative} />
                  {menus.indexOf(menu) == menus.length - 1 ? null : <p className="bar">/</p>}
                </section>
              )
            })}
            <button className="login-button" onClick={() => (window.location.href = "https://wa.me/554130283782")}>
              Sou cliente
            </button>
          </div>
        )}
        {/* <LogoBranco style={{visibility: alternative && 'hidden', margin: location.pathname != '/' && '6vw 0 4vw'}} /> */}
      </div>
    )
}