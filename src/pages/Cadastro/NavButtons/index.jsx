import { Button } from '@mui/material'
import COLORS from '../../../sass/_colors.scss'
import './style.scss'

export const NavButtons = ({ goBack, nextStage, nextOnly, children, disabledNext }) => {
    
    return (
        <div className="buttons-container">
            {!nextOnly && <button onClick={(event) => goBack(event)} style={{backgroundColor: COLORS.gray}} >Voltar</button>}
            <Button variant='contained' type='submit' onClick={(event) => nextStage(event)} disabled={disabledNext} >{children || 'Avançar'}</Button>
        </div>
    )
}