import './style.scss';
import { useState } from 'react';
import { Background } from '../Background';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useMediaQuery } from 'react-responsive';

export const BackgroundContainer = ({ children }) => {
    const [stickyHeader, setstickyHeader] = useState(false)
    const isMobile = useMediaQuery({maxWidth: 600})

    const style = {
        top: 0,
    }
    
    return (
        <div className='BackgroundContainer-Component' >
            <Background style={style} />
            <Header alternative={stickyHeader} setAlternative={setstickyHeader} />

            <div className="children-container">
                {children}
            </div>

            <Footer />
        </div>
    )
}