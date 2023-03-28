import { CustomDashedBorder } from 'custom-dashed-border';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import COLORS from '../../sass/_colors.scss'
import './style.scss';

export const DashedPlusBox = ({ onClick }) => {
    const vw = window.innerHeight / 100

    const borderStyle = {
        stripe: 2 * vw, 
        spacing: 2 * vw
    }
    
    return (
        <div className="DashedPlusBox-Component" onClick={onClick}>
            <CustomDashedBorder top={borderStyle} left={borderStyle} right={borderStyle} bottom={borderStyle} >
                <AddCircleOutlineIcon sx={{color: COLORS.primary}} />
            </CustomDashedBorder>
        </div>
    )
}