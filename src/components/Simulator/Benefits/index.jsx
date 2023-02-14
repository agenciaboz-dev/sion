import {ReactComponent as Icon} from '../../../images/how_item.svg';

export const Benefits = ({ title, text }) => {
    
    return (
        <div className='Benefits-Component' >
            <Icon />
            <h2>{title}</h2>
            <p>{text}</p>
        </div>
    )
}