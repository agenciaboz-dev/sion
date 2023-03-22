import './style.scss';
import {ReactComponent as Arrow} from '../../images/faq_arrow.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll';

export const StickyHomeButton = ({ show }) => {
    
    return (
        <AnchorLink className='StickyHomeButton-Component' style={{visibility: show ? 'visible' : 'hidden'}} href={'#home'}>
            <Arrow />
        </AnchorLink>
    )
}