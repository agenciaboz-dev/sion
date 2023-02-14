import ReactLoading from 'react-loading';
import colors from '../../sass/_colors.scss'
import './style.scss';

const Loading = () => {
    return (
        <div className="loading-screen">
            <ReactLoading
                className='loading-animation'
                type='spinningBubbles'
                color={colors.primary}
            />
        </div>
    )
}

export const LoadingScreen = ({loading}) => {
    return (
        <section>
            {loading ? <Loading /> : null}
        </section>
    )
}

/* 
blank
balls
bars
bubbles
cubes
cylon
spin
spinningBubbles
spokes
 */