import { useNavigate } from 'react-router-dom';
import {ReactComponent as NotFoundIcon} from '../../images/404.svg'
import { BackgroundContainer } from '../../components/BackgroundContainer';
import './style.scss';

export const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className='NotFound-Page' >
            <BackgroundContainer>
                <div className="main-container">
                    <NotFoundIcon />
                    <h1>Ops! página não encontrada</h1>
                    <p>desculpe, a página que você está procurando não existe. Se você acha que algo está quebrado, relate um problema.</p>
                    <div className="buttons-container">
                        <button onClick={() => navigate('/')}>Voltar</button>
                    </div>
                </div>
            </BackgroundContainer>
        </div>
    )
}