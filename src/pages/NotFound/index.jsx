import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Background } from '../../components/Background';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import {ReactComponent as NotFoundIcon} from '../../images/404.svg'
import './style.scss';

export const NotFound = () => {
    const navigate = useNavigate()

    const [stickyHeader, setstickyHeader] = useState(false)
    
    return (
        <div className='NotFound-Page' >
            <Background style={{top: 0}} />
            <Header alternative={stickyHeader} setAlternative={setstickyHeader} />
            <div className="main-container">
                <NotFoundIcon />
                <h1>Ops! página não encontrada</h1>
                <p>desculpe, a página que você está procurando não existe. Se você acha que algo está quebrado, relate um problema.</p>
                <div className="buttons-container">
                    <button onClick={() => navigate('/')}>Voltar</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}