import { Button } from '@mui/material'
import COLORS from '../../../sass/_colors.scss'
import './style.scss'

export const NavButtons = ({ goBack, nextStage, nextOnly, children, disabledNext }) => {
    
    return (
        <div className="buttons-container">
            {!nextOnly && <Button variant='contained' onClick={(event) => goBack(event)} sx={{backgroundColor: COLORS.gray}} >Voltar</Button>}
            <Button variant='contained' type='submit' onClick={(event) => nextStage(event)} disabled={disabledNext} >{children || 'Avançar'}</Button>
        </div>
    )
}