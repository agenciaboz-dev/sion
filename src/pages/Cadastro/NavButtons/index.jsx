import COLORS from '../../../sass/_colors.scss'
import './style.scss'

export const NavButtons = ({ goBack, nextStage }) => {
    
    return (
        <div className="buttons-container">
            <button onClick={() => goBack()} style={{backgroundColor: COLORS.gray}} >Voltar</button>
            <button onClick={() => nextStage()}>Avançar</button>
        </div>
    )
}