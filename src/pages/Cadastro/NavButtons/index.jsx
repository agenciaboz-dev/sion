import COLORS from '../../../sass/_colors.scss'
import './style.scss'

export const NavButtons = ({ goBack, nextStage, nextOnly }) => {
    
    return (
        <div className="buttons-container">
            {!nextOnly && <button onClick={() => goBack()} style={{backgroundColor: COLORS.gray}} >Voltar</button>}
            <button onClick={() => nextStage()}>Avançar</button>
        </div>
    )
}