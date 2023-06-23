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

    const [email, setEmail] = useState('')

    const finish = () => {
        client.setValue(null)
        navigate('/')
    }

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
    
    return <div className='Footer-Component' style={{
        backgroundColor: 'transparent',
        marginLeft: '-10vw',
        width: 0, 
        height: 0,
        borderTop: '15vw solid transparent',
        borderBottom: '0 solid transparent',
        borderRight: `150vw solid ${COLORS.primary}`,
        padding: 0
        }} >
    </div>
}