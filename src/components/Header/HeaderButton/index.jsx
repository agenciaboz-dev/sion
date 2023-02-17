import { useState } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import COLORS from '../../../sass/_colors.scss'

export const HeaderButton = ({ menu, alternative }) => {
    const [headerHovered, setHeaderHovered] = useState(false)

    const alternative_style_hovered = {
        backgroundColor: 'white',
        color: COLORS.primary,
    }

    return (
        <div className='HeaderButton-Component' >
            <AnchorLink href={'#'+menu.name}className='menu-title'
                onMouseEnter={() => setHeaderHovered(true)} onMouseLeave={() => setHeaderHovered(false)}
                style={alternative ? headerHovered ? alternative_style_hovered : null : null}
            >{menu.title}</AnchorLink>
        </div>
    )
}