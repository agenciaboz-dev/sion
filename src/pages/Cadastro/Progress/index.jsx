import './style.scss';
import COLORS from '../../../sass/_colors.scss'
import ProgressBar from '@ramonak/react-progress-bar';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useClient } from '../../../hooks/useClient';
import { useStage } from '../../../hooks/useStage';
import { useEffect, useState } from 'react';
import { useHeaderNavigation } from '../../../hooks/useHeaderNavigation';

const Container = ({ stage, current }) => {
    const [active, setActive] = useState(false)

    const active_style = {
        backgroundColor: COLORS.primary,
        color: 'white'
    }

    useEffect(() => {
        if (current >= stage) {
            setTimeout(() => setActive(true), 1000)
        } else {
            setActive(false)
        }
    }, [current])

    return (
        <div className="container" style={active ? active_style : null}>
            <p>{stage}</p>
        </div>
    )
}

export const Progress = ({  }) => {

    const isMobile = useMediaQuery({maxWidth: 600})

    const client = useClient().value
    const { stage, bar } = useStage()

    const [stages, setStages] = useState([1, 2, 3, 4, 5, 6])
    
    useEffect(() => {

    }, [])

    return (
        <div className='Progress-Component' >
            <div className="progress-bar">
                <ProgressBar
                    completed={bar}
                    maxCompleted={6}
                    isLabelVisible={false}
                    className="wrapper"
                    bgColor={COLORS.primary}
                    borderRadius={'0'}
                    height={isMobile ? '1.5vw' : '0.6vw'}
                    baseBgColor='none'
                    transitionDuration={'1s'}
                />
            </div>
            {stages.map(item => <Container key={item} stage={item} current={stage} />)}
        </div>
    )
}