import COLORS from '../../../sass/_colors.scss'
import './style.scss'

export const NavButtons = ({ goBack, nextStage, nextOnly, children }) => {
    
    return (
        <div className="buttons-container">
            {!nextOnly && <button onClick={(event) => goBack(event)} style={{backgroundColor: COLORS.gray}} >Voltar</button>}
            <button type='submit' onClick={(event) => nextStage(event)}>{children || 'Avançar'}</button>
        </div>
    )
}