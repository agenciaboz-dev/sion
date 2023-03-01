import './style.scss';
import COLORS from '../../../sass/_colors.scss'
import ProgressBar from '@ramonak/react-progress-bar';

const Container = ({ name, current }) => {
    const active_style = {
        backgroundColor: COLORS.primary,
        color: 'white'
    }

    return (
        <div className="container" style={current ? active_style : null}>
            <p>{name}</p>
        </div>
    )
}

export const Progress = ({ stage, progressBarStage }) => {
    
    return (
        <div className='Progress-Component' >
            <div className="progress-bar">
                <ProgressBar
                    completed={progressBarStage}
                    isLabelVisible={false}
                    className="wrapper"
                    bgColor={COLORS.primary}
                    borderRadius={'0'}
                    height={'0.6vw'}
                    baseBgColor='none'
                    transitionDuration={'1s'}
                />
            </div>
            <Container name={'Cadastro'} current={stage == 0} />
            <Container name={'Contrato Social'} current={stage == 1} />
            <Container name={'Contrato'} current={stage == 2} />
        </div>
    )
}