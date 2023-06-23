import { useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useHeaderMenus } from '../../hooks/useHeaderMenus';
import {ReactComponent as Logo} from '../../images/logo_bonita.svg';
import {ReactComponent as BackArrow} from '../../images/back_arrow_small.svg';
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
        <div className="Header-Component" style={vendas && { backgroundColor: COLORS.primary_dark }}>
            <section>
                <div className="top-container" onClick={() => headerNavigate.navigate()}>
                    <div className="back-arrow-container">
                        <BackArrow />
                    </div>
                    <p>{headerNavigate.label}</p>
                </div>
                <div className="bottom-triangle"></div>
                <div className="top-triangle"></div>
                <div className="white-triangle"></div>
            </section>
            {!vendas && <Logo style={alternative ? { visibility: "hidden" } : null} />}
        </div>
    )
}