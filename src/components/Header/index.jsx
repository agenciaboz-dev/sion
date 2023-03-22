import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import {ReactComponent as Logo} from '../../images/logo.svg';
import './style.scss';
import COLORS from '../../sass/_colors.scss'
import { HeaderButton } from './HeaderButton';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useHeaderNavigation } from '../../hooks/useHeaderNavigation';

export const Header = ({ alternative, setAlternative, vendas }) => {

    const menus = useHeaderMenus()
    const navigate = useNavigate()
    const isMobile = useMediaQuery({maxWidth: 600})
    const headerNavigate = useHeaderNavigation()

    const alternative_style = {
        backgroundColor: COLORS.primary,
        position: 'fixed',
        top: 0,
        width: '100vw',
        justifyContent: 'center',
    }

    useEffect(() => {
        const onScroll = () => {
            setAlternative(window.scrollY > 50 ? true : false)
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll)
        };
    }, [])

    
    return (
        <div className='Header-Component' style={vendas && {backgroundColor: COLORS.primary_dark}}>
            {isMobile ? 
            <div className="top-container" onClick={() => headerNavigate.navigate()}>
                <div>
                    <p>{'<'}</p>
                </div>
                <p>{headerNavigate.label}</p>
            </div>
            : 
            <div className="menus-container" style={alternative ? alternative_style : null} >
                {alternative ? <Logo /> : null}
                {menus.map(menu => {
                    return (
                        <section key={menu.id}>
                            <HeaderButton menu={menu} alternative={alternative} />
                            {menus.indexOf(menu) == (menus.length - 1) ? null : <p>/</p>}
                        </section>
                    )
                })}
                <button className="login-button" onClick={() => navigate('/login')}>Sou cliente</button>
            </div>}
            {!vendas && <Logo style={alternative ? {visibility: 'hidden'} : null} />}
        </div>
    )
}