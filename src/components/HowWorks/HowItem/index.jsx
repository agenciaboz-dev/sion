import {ReactComponent as Icon} from '../../../images/how_item.svg';

export const HowItem = ({ right, title, text }) => {
    
    return (
        <div className='HowItem-Component' >
            <div className="left">{right ? <h3>{title}</h3> : <p>{text}</p>}</div>
            <Icon />
            <div className="right">{right ? <p>{text}</p> : <h3>{title}</h3>}</div>
        </div>
    )
}