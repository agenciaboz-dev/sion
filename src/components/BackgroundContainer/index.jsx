import './style.scss';
import { useState } from 'react';
import { Background } from '../Background';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useMediaQuery } from 'react-responsive';
import useMeasure from 'react-use-measure';

export const BackgroundContainer = ({ children, vendas }) => {
    const [stickyHeader, setstickyHeader] = useState(false)
    const isMobile = useMediaQuery({maxWidth: 600})
    const [ref, {height}] = useMeasure()

    const style = {
        top: 0,
    }
    
    return (
        <div className='BackgroundContainer-Component' ref={ref} >
            <Header alternative={stickyHeader} setAlternative={setstickyHeader} vendas={vendas} />

            <div className="children-container">
                {children}
            </div>

            <Footer vendas={vendas} />
        </div>
    )
}