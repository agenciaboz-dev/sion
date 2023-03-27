import './style.scss';
import COLORS from '../../../sass/_colors.scss'
import ProgressBar from '@ramonak/react-progress-bar';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';

const Container = ({ name, current, onClick }) => {
    const active_style = {
        backgroundColor: COLORS.primary,
        color: 'white'
    }

    return (
        <div className="container" style={current ? active_style : null} onClick={onClick}>
            <p>{name}</p>
        </div>
    )
}

export const Progress = ({ stage, progressBarStage }) => {

    const isMobile = useMediaQuery({maxWidth: 600})
    const navigate = useNavigate()

    const client = useClient().value

    const toAttachments = () => {
        if (!client?.form?.name) return

        navigate('/cadastro/anexos')
    }

    const toEconomy = () => {
        navigate('/cadastro')
    }
    
    return (
        <div className='Progress-Component' >
            <div className="progress-bar">
                <ProgressBar
                    completed={progressBarStage}
                    isLabelVisible={false}
                    className="wrapper"
                    bgColor={COLORS.primary}
                    borderRadius={'0'}
                    height={isMobile ? '2.5vw' : '0.6vw'}
                    baseBgColor='none'
                    transitionDuration={'1s'}
                />
            </div>
            <Container name={'Economia'} current={stage >= 0} onClick={toEconomy} />
            <Container name={'Cadastro'} current={stage >= 1} onClick={() => navigate('/cadastro/pessoa')} />
            <Container name={'Anexos'} current={stage >= 2} onClick={toAttachments} />
        </div>
    )
}