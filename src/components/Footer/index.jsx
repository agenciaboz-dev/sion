import './style.scss';
import COLORS from '../../sass/_colors.scss'

export const Footer = ({ vendas }) => {

    return <div className='Footer-Component' style={{
        backgroundColor: 'transparent',
        marginLeft: '-10vw',
        width: 0, 
        height: 0,
        borderTop: '15vw solid transparent',
        borderBottom: '0 solid transparent',
        borderRight: `150vw solid ${COLORS.primary}`,
        padding: 0
        }} >
    </div>
}