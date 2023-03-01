import './style.scss';
import { useState } from 'react';
import { Background } from '../Background';
import { Footer } from '../Footer';
import { Header } from '../Header';

export const BackgroundContainer = ({ children }) => {
    const [stickyHeader, setstickyHeader] = useState(false)
    
    return (
        <div className='BackgroundContainer-Component' >
            <Background style={{top: '6.5vw'}} />
            <Header alternative={stickyHeader} setAlternative={setstickyHeader} />

            <div className="children-container">
                {children}
            </div>

            <Footer />
        </div>
    )
}