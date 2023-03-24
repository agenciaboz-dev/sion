import './style.scss';
import { useState } from 'react';
import { Background } from '../Background';
import { Footer } from '../Footer';
import { Header } from '../Header';
import useMeasure from 'react-use-measure'

export const BackgroundContainer = ({ children }) => {
    const [stickyHeader, setstickyHeader] = useState(false)
    
    const [ref, {height}] = useMeasure()

    return (
        <div className='BackgroundContainer-Component' ref={ref} >
            <Background height={height} />
            <Header alternative={stickyHeader} setAlternative={setstickyHeader} />

            <div className="children-container">
                {children}
            </div>

            <Footer />
        </div>
    )
}