import { useRef, useState } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { useLocation, useNavigate } from "react-router-dom";
import COLORS from '../../../sass/_colors.scss'

export const HeaderButton = ({ menu, alternative }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const ref = useRef(null)
    
    const [headerHovered, setHeaderHovered] = useState(false)

    const goToHome = (event) => {
        navigate('/')
    }

    const alternative_style_hovered = {
        backgroundColor: 'white',
        color: COLORS.primary,
    }

    return (
        <div className='HeaderButton-Component' >
     
            <AnchorLink ref={ref} href={'#'+menu.name} className='menu-title'
                onMouseEnter={() => setHeaderHovered(true)} onMouseLeave={() => setHeaderHovered(false)}
                style={location.pathname == '/' ? alternative ? headerHovered ? alternative_style_hovered : null : null : {display: 'none'}}
            >{menu.title}</AnchorLink> 
            
            <div href={'#'+menu.name} className='menu-title'
                onMouseEnter={() => setHeaderHovered(true)} onMouseLeave={() => setHeaderHovered(false)}
                style={location.pathname == '/' ? {display: 'none'} : alternative ? headerHovered ? alternative_style_hovered : null : null}
                onClick={event => goToHome(event)}
            >{menu.title}</div>
        </div>
    )
}